import DatePicker from "./DatePicker";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: '开始时间预设'
    })
    time_start: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: '结束时间预设'
    })
    time_end: cc.Prefab = null;

    startDate: Date;
    endDate: Date;
    areaDate: Date[];

    callback;



    setDate(startDate: Date, endDate: Date) {

        this.startDate = startDate
        this.endDate = endDate

        this.node.removeAllChildren()

        let startNode = cc.instantiate(this.time_start)
        startNode.parent = this.node
        let startPicker = startNode.getComponent(DatePicker)
        startPicker.setDate(startDate)
        startPicker.setAreaDate(this.areaDate)
        startPicker.setPickDateCallback((date) => {
            console.log('开始时间选择>>>', date);
            this.setAreaDate(date)
        });
        startPicker.setChangeDateCallback((date: Date) => {
            console.log('时间对比>>>', date, this.endDate);

            if (date >= this.endDate) {

                let month = date.getMonth() + 1
                let year = date.getFullYear()
                if (month >= 12) {
                    month = 0
                    year += 1
                }
                console.log('结束时间月份>>>', month);

                let endDate = new Date(year, month, 1)
                this.endDate = endDate
                this.setDate(date, endDate)
            } else {
                this.setDate(date, this.endDate)
            }
        })



        let endNode = cc.instantiate(this.time_end)
        endNode.parent = this.node
        let endPicker = endNode.getComponent(DatePicker)
        endPicker.setDate(endDate)
        endPicker.setAreaDate(this.areaDate)
        endPicker.setPickDateCallback((date) => {
            console.log('结束时间选择>>>', date);
            this.setAreaDate(date)
        });
        endPicker.setChangeDateCallback((date: Date) => {

            if (date <= this.startDate) {

                let month = date.getMonth() - 1
                let year = date.getFullYear()
                if (month <= 0) {
                    month = 12
                    year -= 1
                }
                console.log('结束时间月份>>>', month);

                let startDate = new Date(year, month, 1)
                this.startDate = startDate
                this.setDate(startDate, date)
            } else {
                this.setDate(startDate, date)
            }
        })
    }


    setAreaDate(areaDate: Date) {
        if (!this.areaDate) {
            this.areaDate = []
            this.areaDate.push(areaDate)
        } else if (this.areaDate.length < 2) {
            if (this.areaDate.length == 1 && this.areaDate[0].getTime() > areaDate.getTime()) {
                this.areaDate.unshift(areaDate)
            } else if (this.areaDate.length == 1 && this.areaDate[0].getTime() < areaDate.getTime()) {
                this.areaDate.push(areaDate)
            } else {
                return
            }
        } else if (this.areaDate.length >= 2) {
            this.areaDate = []
            this.areaDate.push(areaDate)
        }
        this.setDate(this.startDate, this.endDate)
    }

    setAreaCallback(callback){
        this.callback = callback
    }

    onClickClose () {
        if (this.callback && this.areaDate && this.areaDate.length == 2) {
            this.callback(this.areaDate);
        }
        this.node.parent = null;
    }

}
