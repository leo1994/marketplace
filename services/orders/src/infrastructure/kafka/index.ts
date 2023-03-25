import { KafkaHelper } from '@marketplace/core'

export default class Kafka {
  static producer = KafkaHelper.producer
  static consumer = KafkaHelper.consumer

  async send (topic: string, message: any): Promise<void> {
    const producer = await Kafka.producer()
    await producer.connect()
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) }
      ]
    })
  }
}
