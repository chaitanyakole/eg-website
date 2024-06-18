import React, { useEffect, useState } from "react";
import {
  Layout,
  FrontEndTypo,
  enumRegistryService,
  organisationService,
  IconByName,
} from "@shiksha/common-lib";
import { HStack, VStack, Radio, Stack, Pressable } from "native-base";
import { useTranslation } from "react-i18next";
import DatePicker from "v2/components/Static/FormBaseInput/DatePicker";
import { useNavigate } from "react-router-dom";

const ExamAttendance = ({ userTokenInfo, footerLinks }) => {
  const { t } = useTranslation();
  const [boardList, setBoardList] = useState();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState();
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    const boardList = await enumRegistryService.ExamboardList();
    setBoardList(boardList?.[0]);
    setLoading(false);
  }, []);

  const handleSelect = (optionId) => {
    setFilter({ ...filter, selectedId: optionId, date: "" });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (filter?.date) {
        const subjectData = await organisationService.getSubjectOnDate({
          filter,
        });
        const subject = !Array.isArray(subjectData?.data)
          ? []
          : subjectData?.data;
        // const newData = subject?.flatMap((subject) => {
        //   return subject.events.map((event) => ({
        //     subject_name: subject.name,
        //     subject_id: subject.id,
        //     event_id: event.id,
        //     start_date: event?.start_date,
        //     end_date: event?.end_date,
        //     type: event.type.charAt(0).toUpperCase() + event.type.slice(1), // Capitalize the type
        //   }));
        // });
        // const LearnerList = await organisationService.getattendanceLearnerList(
        //   newData
        // );

        setSubjects(!Array.isArray(subject) ? [] : subject);
      }
    };

    fetchData();
  }, [filter?.date]);

  return (
    <Layout
      // loading={loading}
      _footer={{ menues: footerLinks }}
    >
      <VStack
        bg="primary.50"
        p="5"
        minHeight={"500px"}
        space={4}
        style={{ zIndex: -1 }}
      >
        <FrontEndTypo.H2 color="textMaroonColor.400">
          {t("MARK_LEARNER_EXAM_ATTENDANCE")}
        </FrontEndTypo.H2>
        <VStack space={4}>
          <FrontEndTypo.H3 bold color="textGreyColor.500">
            {t("SELECT_BOARD")}
          </FrontEndTypo.H3>
          <HStack space={6}>
            {boardList?.boardData?.map((board) => (
              <Radio.Group
                key={board.id}
                onChange={(nextValue) => handleSelect(nextValue)}
                value={filter?.selectedId}
              >
                <Radio colorScheme="red" value={board.id}>
                  {board.name}
                </Radio>
              </Radio.Group>
            ))}
          </HStack>
          {filter?.selectedId && (
            <DatePicker setFilter={setFilter} filter={filter} />
          )}
          {filter?.date != "" && filter?.selectedId && (
            <Stack space={2}>
              <FrontEndTypo.H2 color="textGreyColor.750">
                {t("SUBJECTS")}
              </FrontEndTypo.H2>

              {/* <CustomAccordion
                  data={subjects}
                  setFilter={setFilter}
                  setBoardList={setBoardList}
                  date={filter?.date}
                  board={filter?.selectedId}
                /> */}

              <VStack space={4}>
                {subjects?.map((subject, index) => (
                  <VStack key={subject.id}>
                    <Pressable
                      p={2}
                      bg="boxBackgroundColour.100"
                      // shadow="AlertShadow"
                      borderBottomColor={"garyTitleCardBorder"}
                      borderBottomStyle={"solid"}
                      borderBottomWidth={"2px"}
                      onPress={() => {
                        navigate(`/learner/examattendance`, {
                          state: { subject, filter, boardList },
                        });
                      }}
                    >
                      <HStack w={"100%"} justifyContent={"space-between"}>
                        <HStack space={2} alignItems={"center"}>
                          <FrontEndTypo.H2 color={"blueText.700"}>
                            {subject?.name}
                            {subject?.events?.[0]?.type == "practical" &&
                              ` - ${t("PRACTICALS")}`}
                          </FrontEndTypo.H2>
                        </HStack>
                        {
                          <IconByName
                            isDisabled
                            name="ArrowRightSLineIcon"
                            _icon={{ size: "30px" }}
                            color="blueText.700"
                          />
                        }
                      </HStack>
                    </Pressable>
                  </VStack>
                ))}
                {filter?.date && subjects?.length < 1 && (
                  <FrontEndTypo.H2>{t("DATA_NOT_FOUND")}</FrontEndTypo.H2>
                )}
              </VStack>
            </Stack>
          )}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default ExamAttendance;
