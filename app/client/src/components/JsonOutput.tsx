import { Box, Text} from "@radix-ui/themes";

export function JsonOutput(
    { datas }: { datas: any }
) {
    function formatJsonOutput(data) {
        let result: any = [];
        for (var k in data) {
            result.push({
                key: k,
                value: data[k]
            })
        }

        return result;
    }

    let results = formatJsonOutput(datas);
    return (
        <>
            {
                results.map((data) => (
                    <Box mb="2" key={data.key}>
                        <Box>
                            <Text>{data.key}</Text>
                        </Box>
                        <Box>
                            <Text>{data.value}</Text>
                        </Box>
                    </Box>
                ))
            }
        </>
    );
}