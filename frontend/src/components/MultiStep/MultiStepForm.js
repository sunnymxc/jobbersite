import { useState, useEffect } from 'react';
import { FormItem } from './FormItem';

export const MultiStepForm = (props) => {
    const [answers, setAnswers] = useState({ index: props.step });

    useEffect(() => {
        if (Object.keys(answers).length > 1) {
            props.onPageUpdate(answers.index, answers);
            setAnswers({ index: props.step })
        } else {
            setAnswers({ index: props.step }) 
        }
    }, [props.step])

    const updateAnswers = (value, category) => {
        setAnswers({...answers, [category] : value})
    }

    return (
        <>
            <div>
                {
                    props.list[props.step - 1].items?.map((item, index) => {
                        return (
                            <FormItem 
                                key={item.label} 
                                item={item} 
                                onChange={updateAnswers} 
                                answer={props.pagesAnswers[props.step] ? props.pagesAnswers[props.step][item.value] : null}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

