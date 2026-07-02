package com.cognizant.ormlearn.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    @Before("execution(* com.cognizant.ormlearn.service.*.*(..))")
    public void beforeMethod(JoinPoint joinPoint) {
        LOGGER.info("Entering method: {}", joinPoint.getSignature());
    }

    @AfterReturning(value = "execution(* com.cognizant.ormlearn.service.*.*(..))", returning = "result")
    public void afterMethod(JoinPoint joinPoint, Object result) {
        LOGGER.info("Exiting method: {} with result: {}", joinPoint.getSignature(), result);
    }
}
