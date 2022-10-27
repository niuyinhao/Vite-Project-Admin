import { connect } from 'react-redux'
import { compose } from 'redux'
import './index.css'
import policy from '@/store/action/policy.js'
import { useEffect, useState } from "react";
import moment from 'moment'
import InsureItem from './ListItem';




function Home(props: any) {
  // console.log(props);
  // useEffect(() => {
  //   console.log(moment().format());

  // }, [])
  // var day = moment("1995-12-25");
  // console.log(day);


  // type OptionsFlags<T> = {
  //   [Property in keyof T]: boolean;
  // };
  // type FeatureFlags = {
  //   darkMode: () => void;
  //   newUserProfile: () => void;
  // };

  // type FeatureOptions = OptionsFlags<FeatureFlags>;

  // type FeatureOptions = {
  //    darkMode: boolean;
  //    newUserProfile: boolean;
  // }

  // type MessageOf<T extends { message: unknown }> = T['message']

  // interface Emeil {
  //   message: string
  // };
  // type MessageContent = MessageOf<Emeil>



  // function getProperty<T, K extends keyof T>(obj: T, key: K) {
  //   console.log(key);
  //   return obj[key];
  // }

  // let x = { a: 1, b: 2, c: 3, d: 4 };

  // getProperty(x, 'd');

  const handle = () => {
    const insureds = props.policy.insureds
    props.addInsureds({
      seqond: insureds.length + 1
    })
  }

  const delHandel = (index) => {
    const newPolicy = { ...props.policy }
    newPolicy.insureds.splice(index, 1)
    props.updatePolicy({
      ...newPolicy
    })
  }


  return (
    <div>
      {props.policy.insureds.map((item, index) => {
        return (
          <div key={index}
            className='list'
          >
            <InsureItem
              policy={item}
              index={index}
              delHandel={delHandel} />
          </div>
        )
      })}
      <div
        className='btn'
        onClick={() => handle()}
      >点击</div>
    </div>
  )
}
const propsMaping = (state) => {
  const { policy } = state;
  return {
    policy
  }
}
const dispathMaping = (dispath) => {
  return {
    updatePolicy: compose(dispath, policy.updatePolicy),
    addInsureds: compose(dispath, policy.addInsureds)
  }
}
export default connect(propsMaping, dispathMaping)(Home);
