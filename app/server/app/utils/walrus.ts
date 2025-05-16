import shell from 'shelljs';

export function storage_cost(file: string, epochs: number, cb: any) {
    let cmd1 = `walrus store --dry-run --epochs ${epochs} ${file}`;

    console.log(cmd1);
    shell.exec(cmd1, function (code, stdout, stderr) {
        let cost_match = stdout.match(/Cost to store as new blob \(excluding gas\):\s*(.*?)\s*WAL/)

        if (cost_match) {
            let cost = cost_match[1];
            cb(cost);
        } else {
            cb();
        }
    });
}

export function upload_walrus(file: string, epochs: number, cb: any) {
    let cmd1 = `walrus store --epochs ${epochs} ${file}`;

    console.log(cmd1);
    shell.exec(cmd1, function (code, stdout, stderr) {
        var blob_id = stdout.match(/Blob ID: (.*?)\n/)
        if (blob_id) {
            cb(blob_id[1])
        } else {
            cb("");
        }
    });
}