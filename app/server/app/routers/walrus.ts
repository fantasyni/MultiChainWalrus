import { storage_cost, upload_walrus } from '../utils/walrus';
import { redeem_walrus } from '../utils/sui-utils';
import { get_vaa } from '../utils/vaa';
import Result from '../utils/result';
import DbBlobs from '../db/dbBlobs';
import aes from '../encryption/aes';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const router: Router = Router();
let fullPath = process.cwd() + "/attachment";

router.get("/historys", function(req, res) {
    let account = req.query.account as string;

    let historys = DbBlobs.GetCallerHistorys(account);

    res.json(Result.success(historys));
});

router.post("/upload", uploadFile, async (req, res) => {
    var epoch = req.query.epoch as string;
    var account = req.query.account as string;

    var file_name = req.body.file;
    let file_p = fullPath + "/" + file_name;

    let epoch_number = parseInt(epoch);
    storage_cost(file_p, epoch_number, function (cost: any) {
        let fileData = {
            file: file_p,
            epoch: epoch_number,
            account: account
        }

        let cost_amount = parseFloat(cost) * Math.pow(10, 8);
        let fileDataAes = aes.encrypt(JSON.stringify(fileData));
        res.json({
            cost: cost_amount,
            data: fileDataAes,
        });
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, fullPath)
    },
    filename: function (req, file, cb) {
        let extname = path.extname(file.originalname);
        let originname = path.basename(file.originalname, extname);
        let filename = originname + "-" + Date.now() + extname;
        cb(null, filename);
    }
})

function uploadFile(req: any, res: any, next: any) {
    let upload = multer({ storage: storage, dest: "attachment/" }).single("file");
    upload(req, res, (err) => {
        if (err) {
            res.send("err:" + err);
        } else {
            req.body.file = req.file.filename;
            next();
        }
    })
}

router.post('/checkvaa', async (req, res) => {
    let txid = req.body.txid;
    
    try {
        const vaa = await get_vaa(txid);

        console.log(vaa)
        if (vaa) {
            let results = await redeem_walrus(vaa.vaa);

            console.log(results)
            if (results) {
                let events = results.events;

                if (events) {
                    events.forEach((event) => {
                        if (event.type.indexOf("WalrusMessageRedeemed") != -1) {
                            let parsedJson = event.parsedJson as any;
                            let file_p = "";
                            let epoch = 0;
                            let file = parsedJson.message;
                            let account = "";
                            if (file) {
                                file = aes.decrypt(file);
                                file = JSON.parse(file);
                                file_p = file.file;
                                epoch = file.epoch;
                                account = file.account;
                            }

                            console.log(parsedJson)
                            console.log(file_p)
                            console.log(epoch)

                            upload_walrus(file_p, epoch, function (blobid: string) {
                                if (account) {
                                    DbBlobs.WriteResult(account, blobid, epoch);
                                }
                                res.json(Result.success(blobid));
                            })
                        }
                    })
                }
                console.log(results.events);
            }
        } else {
            res.json(Result.err(500));
        }
    } catch (e) {
        console.error(e)
        res.json(Result.err(500));
    }
})

export default router;