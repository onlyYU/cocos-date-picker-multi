
export class DateUtil {


   /**
    * 获取一个月有多少天
    * @param year 
    * @param month 
    */
    static getDaysInOneMonth(year, month) {
        let tempMonth =  month + 1
        if(tempMonth == 12){
            tempMonth = 0
        }
        //获取月总天数
        var d = new Date(year, tempMonth, 0);

        //将每一天放入集合
        let current = []
        for (let index = 0; index < d.getDate(); index++) {
            let date = new Date(year,month,index + 1)
            current.push(date)
        }
        return current;
    }

    /**
     * 获取上个月的每一天
     * @param year 
     * @param month 
     */
    static getLastMonthDays(year,month){
        let lastMonth = month - 1
        let lastDays = this.getDaysInOneMonth(year,lastMonth)
        let start = this.getWeekDay(year,month,0)
        
        console.log('星期几>>>>',start);
        
        let lastMonthDays = []
        for (let index = start; index > 0; index--) {
            const element = lastDays.length + 1 - index;

            let date = new Date(year,lastMonth,element)
            lastMonthDays.push(date)
        }

        if(lastMonthDays.length == 7){
            return []
        }
        return lastMonthDays
    }

    /**
     * 获取下个月的每一天
     * @param year 
     * @param month 
     */
    static getNextMonthDays(year,month){
        let nextMonth = month + 1
        let end = this.getWeekDay(year,nextMonth,0)
        let nextMonthDays = []
        for (let index = 1; index <= 7 - end; index++) {
            const element = index;

            let date = new Date(year,month,element)
            nextMonthDays.push(date)
        }
        return nextMonthDays
    }


    /**
     * 某一天是星期几
     * @param year 
     * @param month 
     * @param day 
     */
    static getWeekDay(year,month,day){
        let date = new Date()
        date.setFullYear(year,month,day)
        let week = date.getDay()
        return week + 1
    }

    /**
     * 获取最早支持时间
     */
    static getEarliestDate(){
        let earliestDate = '1970-01-01'
        let date = new Date(Date.parse(earliestDate));
        
        return date
    }

}
