import http from "../http-common";

export class DateBuyDataService {

    static getMostRecent() {
        return http.get
    }

    static putBuyer(buyer) {
        return http.post(buyer)
    }

}