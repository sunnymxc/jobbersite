import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Container, StepCompleted, StepWrap } from './MultiStepProgressBarElements';
 
export const MultiStepProgressBar = (props) => {
    return (
        <>
            <Container>
                <ProgressBar
                    percent={((props.step - 1) * 100) / 4}
                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                >
                    <StepWrap>
                        <Step transition="scale">
                            {({ accomplished, page }) => (
                                <StepCompleted className={`step ${accomplished ? "completed" : ""}`}>
                                    1
                                </StepCompleted>
                            )}
                        </Step>
                    </StepWrap>
                    <StepWrap>
                        <Step transition="scale">
                        {({ accomplished, page }) => (
                            <StepCompleted className={`step ${accomplished ? "completed" : ""}`}>
                                2
                            </StepCompleted>
                        )}
                        </Step>
                    </StepWrap>
                    <StepWrap>
                        <Step transition="scale">
                            {({ accomplished, page }) => (
                                <div className={`step ${accomplished ? "completed" : ""}`}>
                                    3
                                </div>
                            )}
                        </Step>
                    </StepWrap>
                    <StepWrap>
                        <Step transition="scale">
                            {({ accomplished, page }) => (
                                <div className={`step ${accomplished ? "completed" : ""}`}>
                                    4
                                </div>
                            )}
                        </Step>
                    </StepWrap>
                    <StepWrap>
                        <Step transition="scale">
                            {({ accomplished, page }) => (
                                <div className={`step ${accomplished ? "completed" : ""}`}>
                                    5
                                </div>
                            )}
                        </Step>
                    </StepWrap>
                </ProgressBar>
            </Container>
        </>
    );
}

