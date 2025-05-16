import { Container, Card, Flex, Box, Text, Link } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { ApiEndpoint } from "../constants";
import { useAccount } from 'wagmi'
import moment from "moment";
import Axios from "axios";

export function History() {
    const account = useAccount()

    let address = account.address;

    const { data, isSuccess } = useQuery({
        queryKey: ["GetHistorys", address],
        queryFn: async () => {
            const response = await Axios.get(`${ApiEndpoint}/v1/walrus/historys?account=${address}`)
            return response.data;
        }
    });

    let resultData: any[] = [];

    if (isSuccess && data && data.data) {
        for (var i = 0; i < data.data.length; i++) {
            let item = data.data[i];

            item.blob_id_link = `https://walruscan.com/testnet/blob/${item.blobid}`;
            resultData.push(item);
        }
    }

    return (
        <>
            <Container size="4">
                {
                    resultData.map((jsonData) => (
                        <Box px="2" py="3" key={jsonData.time}>
                            <Card>
                                <Box>
                                    <Card>
                                        <Flex position="sticky" justify="between">
                                            <Box>
                                                <Text>BlobId </Text>
                                                <Text ml="2"><Link target="_blank" href={jsonData.blob_id_link}>{jsonData.blobid}</Link></Text>
                                                <Text ml="3">Epoch </Text>
                                                <Text ml="1">{jsonData.epoch}</Text>
                                            </Box>
                                            <Box>
                                                <Text>{moment(parseInt(jsonData.time)).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                            </Box>
                                        </Flex>
                                        {/* <Flex position="sticky" justify="between">
                                            <Box>
                                                <Text>Time</Text>
                                            </Box>
                                            <Box>
                                                <Text>{moment(parseInt(jsonData.time)).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                            </Box>
                                        </Flex>
                                        <Flex position="sticky" justify="between">
                                            <Box>
                                                <Text>Blob ID</Text>
                                            </Box>
                                            <Box>
                                                <Link target="_blank" href={jsonData.blob_id_link}>{jsonData.blobid}</Link>
                                            </Box>
                                        </Flex>
                                        <Flex position="sticky" justify="between">
                                            <Box>
                                                <Text>Epoch</Text>
                                            </Box>
                                            <Box>
                                                <Text>{jsonData.epoch}</Text>
                                            </Box>
                                        </Flex> */}
                                    </Card>
                                </Box>
                            </Card>
                        </Box>
                    ))
                }
            </Container>
        </>
    )
}