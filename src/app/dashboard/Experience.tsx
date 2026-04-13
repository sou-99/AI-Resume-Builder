'use client'
import { useAppDispatch, useAppSelector } from "@/src/store/hooks"
import { expType, expTypeError, setError, upDateProjectDetails } from "@/src/store/slices/experienceSlice"
import { Box, Button, Checkbox, Field, Grid, GridItem, Icon, Input, Text, Textarea } from "@chakra-ui/react"
import { FiTrash2 } from "react-icons/fi";
import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import { CalendarDate } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"
import { useState } from "react";

type CheckedState = boolean | "indeterminate";

type CheckedChangeEvent = {
    checked: CheckedState;
};
type CalenderType = DateValue[] | undefined;
type InputChangeEvent =
    HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement | HTMLElement;

type propsType = {
    item: expType;
    error: expTypeError;
    handleChange: (name: string, e: React.ChangeEvent<InputChangeEvent> | CheckedChangeEvent, index: number) => void;
    handleChangeDate: (name: string, e: CalenderType, index: number) => void;
    index: number;
    generateSummary: (index:number,briefInfo:string) => void;
    deleteExperience: (index:number) => void;
};

type calenderPropsType = {
    label: string;
    value: DateValue[] | undefined;
    name: string;
    handleChangeDate: (name: string, e: CalenderType, index: number) => void;
    index: number;
};

const Experience = () => {
    const { experience, error } = useAppSelector((state) => state.experienceSlice)
    const dispatch = useAppDispatch()
    const handleChange = (name: string, e: React.ChangeEvent<InputChangeEvent> | CheckedChangeEvent, index: number): void => {
        let exp = [...experience];
        let err = [...error]
        let similarType1 = ["companyName", "currentRole", 'techUsed', "roleAndResponsibility","projectName","clientName"];
        let similarType2 = ["isPresent"]
        if (similarType1.some((s) => s === name) && 'target' in e && 'value' in e.target) {
            exp[index] = { ...exp[index], [name]: e?.target.value };
            err[index] = { ...err[index], [name]: e?.target.value ? false : true }
            dispatch(upDateProjectDetails(exp))
            dispatch(setError(err))
        } else if (similarType2.some((s1) => s1 === name) && 'checked' in e) {
            exp[index] = { ...exp[index], [name]: e?.checked };
            dispatch(upDateProjectDetails(exp))
        }
    }
    const handleChangeDate = (name: string, e: CalenderType, index: number): void => {
        let exp = [...experience]
        let err = [...error]
        exp[index] = { ...exp[index], [name]: e };
        err[index] = { ...err[index], [name]: e ? false : true }
        dispatch(upDateProjectDetails(exp))
        dispatch(setError(err))
    }
    async function generateSummary(index:number,briefInfo:string) {

        const res = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt:
                    `Professional summary for below roles & responsibilities:
                ${briefInfo}}`
            }),
        });

        const data = await res.json();
        let exp = [...experience]
        exp[index] = { ...exp[index], ["roleAndResponsibility"]: data.result };
        dispatch(upDateProjectDetails(exp))
    }
    const addExperience = () => {
        let exp = [...experience];
        exp.push(        {
            currentRole: "",
            companyName: "",
            fromdate: undefined,
            toDate: undefined,
            isPresent: false,
            techUsed: "",
            roleAndResponsibility: "",
            clientName:"",
            projectName:""
        })
        let err =[...error]
        err.push({
        currentRole: false,
        companyName: false,
        fromdate: false,
        toDate: false,
        isPresent: false,
        techUsed: false,
        roleAndResponsibility: false,
        clientName:false,
        projectName:false
        })
        dispatch(upDateProjectDetails(exp))
        dispatch(setError(err))
    }
    const deleteExperience = (index:number) => {
        let exp = [...experience];
        exp = exp.filter((e,i)=>i!==index)
        let err =[...error]
        err = err.filter((e,j)=>j!==index)
        dispatch(upDateProjectDetails(exp))
        dispatch(setError(err))
    }
    return (
        <Box mt={10}>
            <Text mb={2}>Briefly add all your work experiences. Click on Add to add more experience if any.</Text>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                {experience.map((item: expType, i: number) => <ExpForm item={item} error={error[i]} handleChangeDate={handleChangeDate} handleChange={handleChange} index={i} generateSummary={generateSummary} deleteExperience={deleteExperience}/>)}
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Button mb={2} float={'right'} mr={3} onClick={()=>addExperience()}>Add Experience</Button>
                </GridItem>
            </Grid>
        </Box>
    )
}
export default Experience;

const ExpForm = (props: propsType) => {
    const { item, error, handleChange, index, handleChangeDate, generateSummary,deleteExperience } = props;
    const [briefInfo,setBriefInfo] = useState<string>("")
    return (
        <>
            <GridItem colSpan={{ base: 2, md: 2 }} display={'flex'} justifyContent={'space-between'}>
                <Text fontWeight={'bolder'}>Experience - {index + 1}</Text>
                <Icon as={FiTrash2} color="red.500" mr={3} onClick={()=>deleteExperience(index)}/>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
                <Field.Root invalid={error.currentRole}>
                    <Field.Label>Role</Field.Label>
                    <Input
                        type="text"
                        value={item?.currentRole}
                        placeholder="eg: Data Scientists, Angular developer etc......"
                        onChange={(e) => handleChange("currentRole", e, index)}
                    />
                    {error.currentRole && (
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    )}
                </Field.Root>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
                <Field.Root invalid={error.companyName}>
                    <Field.Label>Company Name</Field.Label>
                    <Input
                        type="text"
                        value={item.companyName}
                        placeholder="e.g. Google, FaceBoock etc..."
                        onChange={(e) => handleChange("companyName", e, index)}
                    />
                    {error.companyName && (
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    )}
                </Field.Root>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
                <Field.Root invalid={error.currentRole}>
                    <Field.Label>Project Name</Field.Label>
                    <Input
                        type="text"
                        value={item?.projectName}
                        placeholder="eg: Data Scientists, Angular developer etc......"
                        onChange={(e) => handleChange("projectName", e, index)}
                    />
                    {error.projectName && (
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    )}
                </Field.Root>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
                <Field.Root invalid={error.clientName}>
                    <Field.Label>Client Name</Field.Label>
                    <Input
                        type="text"
                        value={item?.clientName}
                        placeholder="eg: Data Scientists, Angular developer etc......"
                        onChange={(e) => handleChange("clientName", e, index)}
                    />
                    {error.clientName && (
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    )}
                </Field.Root>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
                {/* <Field.Root invalid={error.fromdate}>
                    <Field.Label>From</Field.Label>
                    <Input
                        type="text"
                        value={item.fromdate}
                        placeholder="start date"
                        onChange={(e) => handleChange("fromdate", e)}
                    />
                    {error.fromdate && (
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    )}
                </Field.Root> */}
                <DateSelector name={"fromdate"} value={item.fromdate} label="fromdate" handleChangeDate={handleChangeDate} index={index} />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
                {/* <Field.Root invalid={error.toDate}>
                    <Field.Label>To</Field.Label>
                    <Input
                        type="text"
                        value={item.toDate}
                        placeholder="end date"
                        onChange={(e) => handleChange("toDate", e)}
                    />
                    {error.toDate && (
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    )}
                </Field.Root> */}
                <DateSelector name={"toDate"} value={item.toDate} label="todate" handleChangeDate={handleChangeDate} index={index} />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
                <Checkbox.Root
                    checked={item.isPresent}
                    onCheckedChange={(e) => handleChange("isPresent", e, index)}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Is current Company?</Checkbox.Label>
                </Checkbox.Root>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
                <Field.Root invalid={error.techUsed}>
                    <Field.Label>Technologies used</Field.Label>
                    <Input
                        type="text"
                        value={item.techUsed}
                        placeholder="e.g.Python, JavaScript, Java etc...."
                        onChange={(e) => handleChange("techUsed", e, index)}
                    />
                    {error.techUsed && (
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    )}
                </Field.Root>
            </GridItem>
            {item.roleAndResponsibility ?
            <GridItem colSpan={{ base: 2, md: 2 }}>
            <Field.Root invalid={error.roleAndResponsibility}>
                <Field.Label>AI generated Roles & Responsibilities</Field.Label>
                    <Textarea
                    placeholder="Your summary will appear here..."
                    value={item.roleAndResponsibility}
                    onChange={(e) => handleChange("roleAndResponsibility", e, index)}

                    minHeight={"10rem"}
                />
                {error.roleAndResponsibility && (
                    <Field.ErrorText>This field is required</Field.ErrorText>
                )}
            </Field.Root>
        </GridItem>
            :<GridItem colSpan={{ base: 2, md: 2 }}>
                <Field.Root invalid={false}>
                    <Field.Label>Brief About Your Roles & Responsibilities</Field.Label>
                        <Textarea
                        placeholder="Your summary will appear here..."
                        value={briefInfo}
                        onChange={(e) => setBriefInfo(e.target.value)}
                        minHeight={"10rem"}
                    />
                    {false && (
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    )}
                </Field.Root>
            </GridItem>
            }
            <GridItem colSpan={{ base: 2, md: 2 }} onClick={()=>generateSummary(index,briefInfo)}>
                <Button>Generate Professional Summary with AI</Button>
            </GridItem>
        </>
    )
}


const DateSelector = (props: calenderPropsType) => {
    const { label, value, handleChangeDate, name, index } = props;
    return (
        <DatePicker.Root
            format={format}
            parse={parse}
            defaultView="month"
            minView="month"
            placeholder="mm/yyyy"
            maxWidth="20rem"
            value={value}
            onValueChange={(e) => handleChangeDate(name, e.value, index)}
        >
            <DatePicker.Label>{label}</DatePicker.Label>
            <DatePicker.Control>
                <DatePicker.Input />
                <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger>
                        <LuCalendar />
                    </DatePicker.Trigger>
                </DatePicker.IndicatorGroup>
            </DatePicker.Control>
            <Portal>
                <DatePicker.Positioner>
                    <DatePicker.Content>
                        <DatePicker.View view="month">
                            <DatePicker.Header />
                            <DatePicker.MonthTable />
                        </DatePicker.View>
                        <DatePicker.View view="year">
                            <DatePicker.Header />
                            <DatePicker.YearTable />
                        </DatePicker.View>
                    </DatePicker.Content>
                </DatePicker.Positioner>
            </Portal>
        </DatePicker.Root>
    )
}

const format = (date: DateValue) => {
    const month = date.month.toString().padStart(2, "0")
    const year = date.year.toString()
    return `${month}/${year}`
}

const parse = (string: string) => {
    const fullRegex = /^(\d{1,2})\/(\d{4})$/
    const fullMatch = string.match(fullRegex)
    if (fullMatch) {
        const [, month, year] = fullMatch.map(Number)
        return new CalendarDate(year, month, 1)
    }
}
