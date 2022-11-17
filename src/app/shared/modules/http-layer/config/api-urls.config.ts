import { ApiConfigModel } from "../models/api-config.model";


const apiUrlConfigs={
//example:
createNewsfeed: new ApiConfigModel({
    module:'demo1',
    pathTemplate:"api/users",
    method:'GET'
}),

getuser:new ApiConfigModel({
    module:'demo2',
    pathTemplate:"users",
    method:'GET'
}),



};
export default apiUrlConfigs