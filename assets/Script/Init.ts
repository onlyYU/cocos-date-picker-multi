// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DatePicker from "./DatePicker";
import DateAreaPicker from './DateAreaPicker'

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({
        type:cc.Label,
        displayName:'显示的时间'
    })
    label: cc.Label = null;

    @property({
        type:cc.Prefab,
        displayName:'单选时间预设'
    })
    datePicker: cc.Prefab = null;

    year;
    month;
    day;

    start () {

    }

    onLoad () {
        let date = new Date();
        this.year = date.getFullYear()
        this.month = date.getMonth()
        this.day = date.getDate()

        this.updateDate()
    }


    onClickDate() {
        let node = cc.instantiate(this.datePicker)
        node.parent = this.node
        let datePicker = node.getComponent(DateAreaPicker)


        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()

        let startDate = new Date(year,month,1)
        let endDate = new Date(year,month + 1,1)

        datePicker.setDate(startDate,endDate)
        datePicker.setAreaCallback((dates:any)=>{
            let startDate:Date = dates[0]
            let endDate:Date = dates[1]
            this.label.string = cc.js.formatStr("%s-%s-%s", startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) + '至' + cc.js.formatStr("%s-%s-%s", endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
        });
    }


    updateDate () {
        this.label.string = cc.js.formatStr("%s-%s-%s", this.year, this.month + 1, this.day);
    }

    // update (dt) {}
}
