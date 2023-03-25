import { Consumer, Kafka, Producer } from 'kafkajs'

export default class KafkaHelper {
  static async producer (): Promise<Producer> {
    const kafka = new Kafka({
      clientId: 'marketplace',
      brokers: ['localhost:9092']
    })
    return kafka.producer()
  }

  static async consumer (): Promise<Consumer> {
    const kafka = new Kafka({
      clientId: 'marketplace',
      brokers: ['localhost:9092']
    })
    return kafka.consumer({ groupId: 'marketplace' })
  }
}
