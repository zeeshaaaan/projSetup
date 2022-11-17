import { Observable, throwError, of, concatMap } from "rxjs";
import { retryWhen,concat,delay } from "rxjs";
import RetryConfig  from "../config/retry-policy.config";

const RetryPolicy=()=>{
    return (source:Observable<any>)=>{
        return source.pipe(
            retryWhen(errors=>
                errors.pipe(
                    concatMap((error,i)=>{
                        const retryAttempts=i+1;
                        const backoffDelay=Math.pow(2,retryAttempts)* RetryConfig.waitPeriod;
                        if(retryAttempts>RetryConfig.maxRetries){
                            return throwError(error);
                        }
                        return of(retryAttempts).pipe(delay(backoffDelay));
                    })
                ))
        )
    }
};

export default RetryPolicy
