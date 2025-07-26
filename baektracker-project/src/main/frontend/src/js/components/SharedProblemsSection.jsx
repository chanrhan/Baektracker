import styles from '../../css/styles.module.css'
import SharedProblemCard from './SharedProblemCard'
import useApi from "../setup/hook/useApi";
import useModal from "../setup/hook/useModal";
import {useEffect, useState} from "react";
import {DateUtils} from "../setup/utils/DateUtils";
import {ObjectUtils} from "../setup/utils/ObjectUtil";
import {ModalType} from "../setup/modal/ModalType";
import solvedAcApi from "../api/SolvedAcApi";
import {get} from "axios";

export default function SharedProblemsSection({fromDate, toDate}) {
  const {problemApi} = useApi();
  const modal = useModal();
  const today = new Date();

  const [sharedProblems, setSharedProblems] = useState([]);
  const [editMode, setEditMode] = useState(false)

  const [sharedProblemInputs, setSharedProblemInputs] = useState([-1, -1, -1])
  const [orgSp, setOrgSp] = useState([-1,-1]);

  useEffect(() => {
    getSharedProblems();
  }, [fromDate, toDate]);

  const getSharedProblems = ()=>{
    problemApi.getSharedProblem(fromDate).then(({status,data})=>{
      // console.table(data)
      if(data){
        const copy = [...sharedProblemInputs];
        for(const i in data){
          copy[i] = data[i].problem_id
        }
        setSharedProblemInputs(copy);
        setSharedProblems(data);
        setOrgSp(copy);
      }
    })
  }

  const showEditButton = ()=>{
    const p = DateUtils.dateDiff(DateUtils.getFirstDateOfWeek(today), new Date(fromDate));
    // console.log(p)
    if(p < -7){
      // setEditMode(false)
      return false;
    }
    return true;
  }

  const handleEditMode = ()=>{
    if(!showEditButton()){
      return;
    }
    const curr_state = editMode;
    setEditMode(!editMode)
    if(curr_state){
      const body = []
      if(sharedProblemInputs[0] != -1 && sharedProblemInputs[0] != orgSp[0]){
        body.push(sharedProblemInputs[0])
      }
      if(sharedProblemInputs[1] != -1 && sharedProblemInputs[1] != orgSp[1]){
        body.push(sharedProblemInputs[1])
      }
      if(sharedProblemInputs[2] != -1 && sharedProblemInputs[2] != orgSp[2]){
        body.push(sharedProblemInputs[2])
      }
      console.table(body)
      if(ObjectUtils.isEmptyArray(body)){
        return;
      }
      problemApi.updateSharedProblem(fromDate, sharedProblemInputs).then(({data})=>{
        if(data){
          modal.openModal(ModalType.SNACKBAR.Info, {
            msg: "공통문제가 변경되었습니다."
          })
        }
        getSharedProblems()
        // getAllUsers()
      })

    }
  }

  const openSharedProblemModal = ()=>{
      modal.openModal(ModalType.LAYER.SharedProblemDetail, {
        problems: sharedProblems,
        date: fromDate,
        onSubmit: ()=>{
          getSharedProblems()
        }
      })
  }

  return (
    <div className={styles.sharedProblemsSection}>
      {/* Header */}
      <div className={styles.sharedProblemsHeaderContainer}>
        <div className={styles.sharedProblemsHeader}>
          <h2 className={styles.sharedProblemsTitle}>주간 공통 문제</h2>
          <button type='button' className={styles.btn_edit_shared_problem} onClick={openSharedProblemModal}></button>
        </div>
      </div>

      {/* Problem Cards Container */}
      <div className={styles.cardsContainer}>
        {[1,2,3].map((v, index) => {
          const sp = sharedProblems[index];
          const rankList = sp?.rank_list && JSON.parse(sp.rank_list);
          // console.table(JSON.parse(sp.rank_list))
          return <SharedProblemCard key={index} level={sp?.level} id={sp?.problem_id} title={sp?.title} rankList={rankList}/>
        })}
      </div>
    </div>
  )
} 