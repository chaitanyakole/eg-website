import { H1, H2, IconByName } from "@shiksha/common-lib";
import { Box, Stack, Button, HStack, Text, VStack } from "native-base";
import React, { useState } from "react";
import Shortlisted from "./shortlisted";

export default function Interviewschedule() {
  const [status, setStatus] = React.useState(false);
  const [data, setData] = React.useState();

  // React.useEffect(async () => {
  //   const iData = await facilitatorRegistryService;
  //   setData(iData);
  //   console.log(iData);
  // });
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      width="Fill(1072px)"
      background="#CAE9FF"
      border="1px solid #AFB1B6"
    >
      {status ? (
        <Shortlisted setStatus={setStatus} status={status} />
      ) : (
        <Box>
          <HStack>
            <Box flexDirection="column" alignItems="flex-start" width="713px">
              <H2>Schedule for an Interview</H2>
              <HStack ml="-1%">
                <IconByName name="TimeLineIcon"></IconByName>
                <Text marginTop="3%"> 16th May , 11:00 to 12:00</Text>
                <IconByName name="MapPinLineIcon"></IconByName>
                <Text marginTop="3%">On Phone</Text>
              </HStack>
            </Box>
            <Box marginTop={"13px"} marginLeft="10%">
              <Button onPress={() => setStatus(true)} borderRadius="30px">
                Edit Details
              </Button>
            </Box>
          </HStack>
        </Box>
      )}
    </Stack>
  );
}
