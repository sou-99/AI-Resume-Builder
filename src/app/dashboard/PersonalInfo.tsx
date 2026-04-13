"use client"
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import { Alert, Box, Button, Field, Grid, GridItem, Input, useBreakpointValue } from "@chakra-ui/react";
import { updatePersonalInfo, setError } from "../../store/slices/personalInfoSlice"
import { setActiveStep } from "@/src/store/slices/globalSlice";
import { useState } from "react";
const PersonalInfo = () => {
    const { name, email, phone, role,location, error } = useAppSelector((state) => state.personalInfo)
    const [showAlert,setShowAlert] = useState(false)
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const dispatch = useAppDispatch()
    const handleChange = (key: "name" | "email" | "phone" | "role" | "location", value: string): void => {
        const payload = { key, value }
        dispatch(updatePersonalInfo(payload))
        if (key === "email") {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                dispatch(setError({ key, value: true }))
            } else {
                dispatch(setError({ key, value: false }))
            }
        }
        if (key === "phone") {
            if (!/^[6-9]\d{9}$/.test(value)) {
                dispatch(setError({ key, value: true }))
            } else {
                dispatch(setError({ key, value: false }))
            }
        }
        if (key === "name" || key === "role" || key === "location") {
            if (value.trim().length === 0) {
                dispatch(setError({ key, value: true }))
            } else {
                dispatch(setError({ key, value: false }))
            }
        }
    }
    const savehandler = ():void =>{
        if(Object.values(error).every((v)=>v===false) && name && email && phone && role){
            dispatch(setActiveStep("profile summary"))
        }else{
            setShowAlert(true)
        }
    }
    return (
        <Box mt={10}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Field.Root invalid={error.name}>
                        <Field.Label>Name</Field.Label>
                        <Input
                            type="text"
                            value={name}
                            placeholder="name..."
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        {error.name && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Field.Root invalid={error.role}>
                        <Field.Label>Designation</Field.Label>
                        <Input
                            type="text"
                            value={role}
                            placeholder="e.g. software engineer, react developer etc....."
                            onChange={(e) => handleChange("role", e.target.value)}
                        />
                        {error.role && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Field.Root invalid={error.location}>
                        <Field.Label>City</Field.Label>
                        <Input
                            type="text"
                            value={location}
                            placeholder="e.g. Bengaluu, New York.."
                            onChange={(e) => handleChange("location", e.target.value)}
                        />
                        {error.location && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Field.Root invalid={error.phone}>
                        <Field.Label>Phoner Number</Field.Label>
                        <Input
                            type="text"
                            value={phone}
                            maxLength={10}
                            placeholder="e.g. 978778871"
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                        {error.phone && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Field.Root invalid={error.email}>
                        <Field.Label>Email</Field.Label>
                        <Input
                            type="email"
                            value={email}
                            placeholder="email"
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                        {error.email && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                {showAlert && <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Alert.Root status="error">
                        <Alert.Indicator />
                            <Alert.Title>There was an error processing your request</Alert.Title>
                        </Alert.Root>
                </GridItem>}
                {/* {isMobile?<GridItem colSpan={{ base: 2, md: 2 }}>
                    <Button onClick={savehandler}>Save</Button>
                </GridItem>:<></>} */}
            </Grid>
        </Box>
    )
}
export default PersonalInfo;