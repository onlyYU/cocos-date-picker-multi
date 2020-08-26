// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemDay extends cc.Component {

    @property({
        type: cc.Label,
        displayName: '日期'
    })
    lbDay: cc.Label = null;

    @property({
        type: cc.Sprite,
        displayName: '选中的日期'
    })
    spSel: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        displayName: '非本月日期'
    })
    otherMonth: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        displayName: '区域显示'
    })
    areaSp: cc.Sprite = null;


    index;//默认选中的
    date: Date;
    callback;
    isCurrent;

    setDay(areaDate: Date[], dayBean, cb) {
        this.areaSp.node.active = false

        this.date = dayBean.date
        this.callback = cb;
        this.isCurrent = dayBean.isCurrent

        if (dayBean.isCurrent) {
            this.otherMonth.node.active = false
        } else {
            this.otherMonth.node.active = true
        }

        //显示日期
        let day = this.date.getDate()
        this.lbDay.string = day + '';


        //当前时间
        let currentDate = new Date()
        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth()
        let currentDay = currentDate.getDate()
        let newCurrentDate = new Date(currentYear, currentMonth, currentDay)


        //当前时间高亮
        if (newCurrentDate.getTime() == this.date.getTime()) {
            console.log('当前时间>>>', newCurrentDate);
            this.spSel.enabled = true
        } else {
            this.spSel.enabled = false
        }


        //如果不是本月日期 不参与区域选择
        if (!dayBean.isCurrent) {
            return
        }

        //区间标识
        if (!areaDate) {
            return
        }

        //如果只选择了开始时间
        if (areaDate.length == 1 && areaDate[0].getTime() == this.date.getTime()) {
            this.areaSp.node.active = true
        } 
        //如果开始和结束时间都选择了
        else if (areaDate.length == 2) {
            if (this.date.getTime() >= areaDate[0].getTime() && this.date.getTime() <= areaDate[1].getTime()) {
                this.areaSp.node.active = true
            }
        }
    }

    onClickItem() {
        let currentDate = new Date()

        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth()
        let currentDay = currentDate.getDate()
        let newCurrentDate = new Date(currentYear, currentMonth, 1)

        if (this.callback && this.isCurrent) {
            console.log('点击了');
            this.callback(this.date);
        }
    }
}
