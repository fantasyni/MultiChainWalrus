import fs from "fs-extra";
import { writeFileSync } from "../utils/util";

var DATA_DIR = process.cwd() + "/data/blobs";

export default class DbBlobs {
    public static init() {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirpSync(DATA_DIR);
        }
    }

    static getDataPath(caller: string, blobid: string): string {
        let p = DATA_DIR + "/" + caller;

        if (!fs.existsSync(p)) {
            fs.mkdirpSync(p);
        }

        return p + "/" + blobid + ".json";
    }

    public static WriteResult(caller: string, blobid: string, epoch: number): string {
        var data_path = this.getDataPath(caller, blobid);

        writeFileSync(data_path, {
            blobid,
            epoch,
            time: Date.now()
        });

        return data_path;
    }

    public static GetResult(caller: string, blobid: string): string {
        var data_path = this.getDataPath(caller, blobid);

        if (!fs.existsSync(data_path)) {
            return "";
        }

        let result = fs.readFileSync(data_path).toString();
        return result;
    }

    public static GetCallerHistorys(caller: string): any[] {
        let results: string[] = [];
        var caller_path = DATA_DIR + "/" + caller;

        if (fs.existsSync(caller_path)) {
            var dirs = fs.readdirSync(caller_path);

            for (var i = 0; i < dirs.length; i++) {
                var caller_id_path = caller_path + "/" + dirs[i];

                var data_path = caller_id_path;
                let result = fs.readFileSync(data_path).toString();
                if (result) {
                    let result_data = JSON.parse(result);
                    results.push(result_data);
                }
            }
        }

        results = results.sort(function (a: any, b: any) {
            let aTime = a.time;
            let bTime = b.time;
            if (aTime > bTime) return -1;
            if (aTime < bTime) return 1;
            return 0;
        });
        return results;
    }
}