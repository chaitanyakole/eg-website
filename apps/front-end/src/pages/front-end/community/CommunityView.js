import {
  FrontEndTypo,
  GetEnumValue,
  Layout,
  benificiaryRegistoryService,
  enumRegistryService,
  getOptions,
} from "@shiksha/common-lib";
import React from "react";
import { templates, widgets } from "component/BaseInput";
import { useTranslation } from "react-i18next";
import schema1 from "./schema";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { Alert, Box, Button, HStack, VStack } from "native-base";

export default function CommunityView({ footerLinks }) {
  const { t } = useTranslation();
  const [lang, setLang] = React.useState(localStorage.getItem("lang"));
  const [schema, setSchema] = React.useState({});
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [addMore, setAddMore] = React.useState();
  const [data, setData] = React.useState({});
  const [enumOptions, setEnumOptions] = React.useState({});
  const formRef = React.useRef();

  React.useEffect(async () => {
    const qData = await enumRegistryService.listOfEnum();
    setEnumOptions(qData?.data ? qData?.data : {});
    const data = qData?.data?.COMMUNITY_MEMBER_DESIGNATIONS;
    let newSchema = schema1;
    if (schema1["properties"]) {
      newSchema = getOptions(newSchema, {
        key: "designation",
        arr: data,
        title: "title",
        value: "value",
      });
      setSchema(newSchema);
    }
  }, []);

  React.useEffect(async () => {
    const getData = await benificiaryRegistoryService.getCommunityReferences({
      context: "community.user",
    });
    setData(getData || {});
  }, []);
  const onChange = async (e, id) => {
    const data = e.formData;
    const newData = { ...formData, ...data };
    setFormData(newData);
  };

  const transformErrors = (errors) => {
    return errors.map((error) => {
      if (error.name === "required") {
        if (schema?.properties?.[error?.property]?.title) {
          error.message = `${t("REQUIRED_MESSAGE")} "${t(
            schema?.properties?.[error?.property]?.title
          )}"`;
        } else {
          error.message = `${t("REQUIRED_MESSAGE")}`;
        }
      }
      return error;
    });
  };

  const onAdd = () => {
    setFormData();
    setAddMore(true);
  };
  const onSubmit = async () => {
    const result = await benificiaryRegistoryService.createCommunityReference(
      formData
    );
    if (formData?.contact_number.toString()?.length !== 10) {
      const newErrors = {
        contact_number: {
          __errors: [t("PLEASE_ENTER_VALID_NUMBER")],
        },
      };
      setAddMore(false);
      setErrors(newErrors);
    }
    if (result?.success === true) {
      window?.location?.reload(true);
    }
  };

  return (
    <Layout
      _appBar={{
        onlyIconsShow: ["userInfo", "loginBtn", "langBtn"],
        lang,
        setLang,
        _box: { bg: "white", shadow: "appBarShadow" },
      }}
      _page={{ _scollView: { bg: "formBg.500" } }}
      _footer={{ menues: footerLinks }}
    >
      <Box p="4">
        {!addMore && (
          <Alert
            alignSelf="center"
            status="warning"
            p="2"
            flexDirection="row"
            gap="2"
          >
            <Alert.Icon size="5" />
            <FrontEndTypo.H2>{t("COMMUNITY_ALERT_MESSAGE")}</FrontEndTypo.H2>
          </Alert>
        )}
        {!addMore ? (
          <VStack paddingTop="4" space="4">
            {data?.data?.length > 0 ? (
              data?.data?.map((item, index) => {
                return (
                  <VStack
                    key="index"
                    px="5"
                    py="4"
                    space="4"
                    borderRadius="10px"
                    borderWidth="1px"
                    bg="white"
                    borderColor="appliedColor"
                    width="90%"
                    alignSelf="center"
                  >
                    <HStack space="1">
                      <FrontEndTypo.H3>{index + 1})</FrontEndTypo.H3>
                      <FrontEndTypo.H3 bold underline>
                        {t("MEMBER_DETAILS")}
                      </FrontEndTypo.H3>
                      :-
                    </HStack>

                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      borderColor="light.300"
                      pb="1"
                      borderBottomWidth="1"
                    >
                      <FrontEndTypo.H3
                        color="textGreyColor.50"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {t("FIRST_NAME")}
                      </FrontEndTypo.H3>
                      :
                      <FrontEndTypo.H3
                        color="textGreyColor.800"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {item?.first_name ? item?.first_name : "-"}
                      </FrontEndTypo.H3>
                    </HStack>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      borderColor="light.300"
                      pb="1"
                      borderBottomWidth="1"
                    >
                      <FrontEndTypo.H3
                        color="textGreyColor.50"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {t("MIDDLE_NAME")}
                      </FrontEndTypo.H3>
                      :
                      <FrontEndTypo.H3
                        color="textGreyColor.800"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {item?.middle_name ? item?.middle_name : "-"}
                      </FrontEndTypo.H3>
                    </HStack>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      borderColor="light.300"
                      pb="1"
                      borderBottomWidth="1"
                    >
                      <FrontEndTypo.H3
                        color="textGreyColor.50"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {t("LAST_NAME")}
                      </FrontEndTypo.H3>
                      :
                      <FrontEndTypo.H3
                        color="textGreyColor.800"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {item?.last_name ? item?.last_name : "-"}
                      </FrontEndTypo.H3>
                    </HStack>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      borderColor="light.300"
                      pb="1"
                      borderBottomWidth="1"
                    >
                      <FrontEndTypo.H3
                        color="textGreyColor.50"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {t("DESIGNATION")}
                      </FrontEndTypo.H3>
                      :
                      <FrontEndTypo.H3
                        color="textGreyColor.800"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {item?.designation ? (
                          <GetEnumValue
                            t={t}
                            enumType={"COMMUNITY_MEMBER_DESIGNATIONS"}
                            enumOptionValue={item?.designation}
                            enumApiData={enumOptions}
                          />
                        ) : (
                          "-"
                        )}
                      </FrontEndTypo.H3>
                    </HStack>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      borderColor="light.300"
                      pb="1"
                      borderBottomWidth="1"
                    >
                      <FrontEndTypo.H3
                        color="textGreyColor.50"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {t("CONTACT_NUMBER")}
                      </FrontEndTypo.H3>
                      :
                      <FrontEndTypo.H3
                        color="textGreyColor.800"
                        fontWeight="400"
                        flex="0.3"
                      >
                        {item?.contact_number ? item?.contact_number : "-"}
                      </FrontEndTypo.H3>
                    </HStack>
                  </VStack>
                );
              })
            ) : (
              <></>
            )}
            {data?.data?.length >= 10 ? (
              <></>
            ) : (
              <Button variant={"link"} colorScheme="info">
                <FrontEndTypo.H3
                  color="blueText.400"
                  underline
                  bold
                  onPress={onAdd}
                >
                  {t("ADD_COMMUNITY_MEMBER")}
                </FrontEndTypo.H3>
              </Button>
            )}
          </VStack>
        ) : (
          <Form
            key={schema}
            ref={formRef}
            extraErrors={errors}
            showErrorList={false}
            noHtml5Validate={true}
            {...{
              validator,
              templates,
              widgets,
              schema: schema || {},
              formData,
              onChange,
              onSubmit,
              transformErrors,
            }}
          >
            <FrontEndTypo.Primarybutton
              p="4"
              mt="4"
              onPress={() => {
                if (formRef.current.validateForm()) {
                  formRef?.current?.submit();
                }
              }}
            >
              {t("SAVE")}
            </FrontEndTypo.Primarybutton>
            <FrontEndTypo.Secondarybutton
              p="4"
              mt="4"
              onPress={() => setAddMore()}
            >
              {t("CANCEL")}
            </FrontEndTypo.Secondarybutton>
          </Form>
        )}
      </Box>
    </Layout>
  );
}
