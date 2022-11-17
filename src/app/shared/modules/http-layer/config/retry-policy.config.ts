const RetryConfig={
    maxRetries:3,
    waitPeriod:3000,
    retryableStatuscodes:{400:true},
    retriableMethods:{GET:true}
};

export default RetryConfig;