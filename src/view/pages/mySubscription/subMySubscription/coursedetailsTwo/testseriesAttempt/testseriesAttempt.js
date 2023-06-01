import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from "../../../../../../webServices/webservice"
import Modale from './module';
import { Tokens } from '../../../../../../App';
import { ProtectUrl } from '../../../../../../utils';
import { webUrls } from '../../../../../../webServices/webUrls'
import * as view from "../../../../../view"
import { COURSES } from '../../../../../../route/route';
import { TEST_SERIES_REPORT } from '../../../../../../route/route';


const TestSeriesAttempt = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const token = useContext(Tokens)
    const { id, nameindex } = useParams()
    const student_id = localStorage.getItem("eXvctIdv")
    const [testSeriesQuestions, setTestSeriesQuestions] = useState([])
    /* showing questions and questions paper */

    /* test attempt state*/
    const [Right, setRight] = useState(0)
    const [Wrong, setWrong] = useState(0)
    const [Attempt, setAttempt] = useState(0)
    const [notAttempt, setNotAttempt] = useState(0)
    const [option, setOption] = useState([])
    /* test attempt state*/

    /* test modal state*/
    const [show, setShow] = useState(false);



    useEffect(() => {
        if (token) {
            const testData = async () => {
                if (ProtectUrl(slug)) {
                    try {
                        let response = await axiosClient.get(`${webUrls.TESTSERIES_URL}/${id}/`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if (response.status === 200) {
                            setTestSeriesQuestions(response.data)
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    navigate(`/${COURSES}/${slug}`)
                }
            }
            testData()
        }
    }, [id, token, slug, navigate])

    /* test testAttempt function*/
    const handalOption = (opt, Obj) => {
        let Id = Obj.id
        let check;
        let res = option.filter(item => item.id === Id)
        if (res.length) {
            const index = option.findIndex(item => item.id === Id)
            option.splice(index, 1)
            let cot = testSeriesQuestions?.[0]?.CategoryTestSeriesQuestions?.filter(item => item.answer.trim() === opt && item.opt_1 === Obj.opt_1 && item.opt_2 === Obj.opt_2 && item.opt_3 === Obj.opt_3 && item.opt_4 === Obj.opt_4)

            if (cot.length) {
                check = true
            } else {
                check = false
            }
            setOption([...option, { answer: opt, id: Id, check }])
        } else {
            let cot = testSeriesQuestions?.[0]?.CategoryTestSeriesQuestions?.filter(item => item.answer.trim() === opt && item.opt_1 === Obj.opt_1 && item.opt_2 === Obj.opt_2 && item.opt_3 === Obj.opt_3 && item.opt_4 === Obj.opt_4)
            if (cot.length) {
                check = true
            } else {
                check = false
            }
            setOption([...option, { answer: opt, id: Id, check }])
        }
    }

    const dataAdd = () => {
        setAttempt(option?.length)
        setNotAttempt(testSeriesQuestions?.[0]?.CategoryTestSeriesQuestions?.length - option?.length)
        let rightAnswer = option?.filter(item => item.check === true).length
        setRight(rightAnswer)
        let wrongAnswer = option.length - rightAnswer
        setWrong(wrongAnswer)
        sessionStorage.setItem("test_result", JSON.stringify({ Right, Wrong, testSeriesQuestions, notAttempt, option }))
    }

    /* test modal function*/
    const dataSubmit = async () => {
        const reqData = JSON.stringify({
            student_id,
            test_series_id: id,
            correct_ans: Right,
            wrong_ans: Wrong,
            skipped_qns: notAttempt
        })
        try {
            let response = await axiosClient.post(webUrls.TEST_RECORD_URL, reqData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.status) {
                setShow(false)
                alert("test record submitted")
                navigate(TEST_SERIES_REPORT)
            } else {
                setShow(false)
                alert(response.data.message)
                navigate(TEST_SERIES_REPORT)
            }
        } catch (e) {
            console.log(e);
        }

    }


    /* for back button click massege   */

    useEffect(() => {
        const confirmBack = () => {
            const back = window.confirm('Your current test progress will be lost!')
            if (back) {
                window.removeEventListener('popstate', confirmBack);
                window.history.back()
            } else {
                window.history.pushState(null, document.title, window.location.href)
            }
        }
        window.history.pushState(null, document.title, window.location.pathname); // preventing back initially
        window.addEventListener('popstate', confirmBack);
        return () => { window.removeEventListener('popstate', confirmBack) };

    }, [])
    /*    close           */
    useEffect(() => {
        const disableRightClick = (e) => {
            e.preventDefault()
        }
        window.addEventListener('contextmenu', disableRightClick)
        return () => { window.removeEventListener('contextmenu', disableRightClick) }
    }, [])

    useEffect(() => {
        window.onbeforeunload = (e) => {
            e.preventDefault()
            return "you lost your data"
        }
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <view.TEST_QUESTIONS nameindex={nameindex} testSeriesQuestions={testSeriesQuestions} handalOption={handalOption} />
                    <view.TEST_TIMER testSeriesQuestions={testSeriesQuestions} option={option} dataAdd={dataAdd} setShow={setShow} dataSubmit={dataSubmit} />
                </div>
            </div>
            <Modale show={show} setShow={setShow} student={testSeriesQuestions} Attempt={Attempt} notAttempt={notAttempt} dataSubmit={dataSubmit} />
        </>
    )
}

export default TestSeriesAttempt;