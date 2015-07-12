I intended to implement a simple toolkit to parse and analyse hadoop
logs but found that there is a built-in tool called rumen has already
done a lot of jobs. There are three kind of logs produced by hadoop:
log4j logs, job history logs and metrics logs. While parsing the most
complex one, job history logs, has already done by rumen and metrics
logs may be various (however, can be simply parsed by regexp), this
module tends to parse the logs produced by log4j. So far, only xml
appender is supported.
