/**
 * @author - Chamath_Wijayarathna
 * Date :7/8/2022
 */


package com.cloudofgoods.consumer.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {

    @KafkaListener(topics = "NewTopic", groupId = "group_id")
    public void consume(String message)
    {
        System.out.println("message = " + message);
    }
}
