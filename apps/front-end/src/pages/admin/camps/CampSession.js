import {
  CardComponent,
  FrontEndTypo,
  IconByName,
  Layout,
} from "@shiksha/common-lib";
import { HStack, VStack } from "native-base";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function CampSession({ footerLinks }) {
  const navigate = useNavigate();
  return (
    <Layout
      _appBar={{
        onPressBackButton: (e) => navigate("/"),
        onlyIconsShow: ["backBtn", "langBtn"],
        leftIcon: <FrontEndTypo.H2>{"पाठ्यक्रम सूची"}</FrontEndTypo.H2>,
      }}
      _footer={{ menues: footerLinks }}
    >
      <VStack flex={1} space={"5"} p="5" background={"bgGreyColor.200"}>
        <HStack space="2">
          <IconByName name="BookOpenLineIcon" />
          <FrontEndTypo.H2 color="textMaroonColor.400">
            पाठ्यक्रम
          </FrontEndTypo.H2>
        </HStack>
        <CardComponent
          children={
            <VStack p="5" space="4">
              <VStack alignItems="center">
                <FrontEndTypo.H3
                  alignContent={"Center"}
                  color="textMaroonColor.400"
                  bold
                >
                  सत्रर 1
                </FrontEndTypo.H3>
              </VStack>
              <FrontEndTypo.DefaultButton background={"#FF0000"}>
                पाठ्यक्रम पूरा हो गया
              </FrontEndTypo.DefaultButton>
              <FrontEndTypo.DefaultButton textColor={"textMaroonColor.400"}>
                पाठ आधा पूरा हुआ
              </FrontEndTypo.DefaultButton>
            </VStack>
          }
        />
        <CardComponent
          children={
            <VStack p="5" space="4">
              <VStack alignItems="center">
                <FrontEndTypo.H3
                  alignContent={"Center"}
                  color="textMaroonColor.400"
                  bold
                >
                  सत्रर 2
                </FrontEndTypo.H3>
              </VStack>
              <FrontEndTypo.DefaultButton background={"#FF0000"}>
                पाठ्यक्रम पूरा हो गया
              </FrontEndTypo.DefaultButton>
              <FrontEndTypo.DefaultButton textColor={"textMaroonColor.400"}>
                पाठ आधा पूरा हुआ
              </FrontEndTypo.DefaultButton>
            </VStack>
          }
        />
      </VStack>
    </Layout>
  );
}
