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
        displayName:'区域时间显示'
    })
    areaLabel: cc.Label = null;

    @property({
        type:cc.Label,
        displayName:'单个时间显示'
    })
    singleLabel: cc.Label = null;

    @property({
        type:cc.Prefab,
        displayName:'单个时间预设'
    })
    datePicker: cc.Prefab = null;

    @property({
        type:cc.Prefab,
        displayName:'区域时间预设'
    })
    dateAreaPicker: cc.Prefab = null;

    @property({
        type:cc.Node,
        displayName:'展示时间对话框的区域'
    })
    contentNode:cc.Node = null


    /**
     * 展示时间区域选择框
     */
    onDateAreaPikcerShow() {
        let node = cc.instantiate(this.dateAreaPicker)
        this.contentNode.removeAllChildren()
        node.parent = this.contentNode
        let dateAreaPicker = node.getComponent(DateAreaPicker)


        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()

        let startDate = new Date(year,month,1)
        let endDate = new Date(year,month + 1,1)

        dateAreaPicker.setDate(startDate,endDate)
        dateAreaPicker.setAreaCallback((dates:any)=>{
            let startDate:Date = dates[0]
            let endDate:Date = dates[1]
            this.areaLabel.string = cc.js.formatStr("%s-%s-%s", startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()) + '至' + cc.js.formatStr("%s-%s-%s", endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate())
        });
    }

    /**
     * 展示单个时间选择框
     */
    onDatePikcerShow() {
        let node = cc.instantiate(this.datePicker)
        this.contentNode.removeAllChildren()
        node.parent = this.contentNode
        let datePicker = node.getComponent(DatePicker)


        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()

        let startDate = new Date(year,month,1)

        datePicker.setDate(startDate)
        datePicker.setPickDateCallback((dates:any)=>{
            this.singleLabel.string = cc.js.formatStr("%s-%s-%s", dates.getFullYear(), dates.getMonth() + 1, dates.getDate())
            node.active = false
        });
    }

    // update (dt) {}
}
