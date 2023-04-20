import { Consumer, Kafka, Partitioners, Producer } from 'kafkajs'

const BROKERS_URL = process.env.KAFKA_BROKERS_URL || 'localhost:9092'

export default class KafkaHelper {
  static async producer (): Promise<Producer> {
    const kafka = new Kafka({
      clientId: 'marketplace',
      brokers: [BROKERS_URL]
    })
    return kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
  }

  static async consumer (): Promise<Consumer> {
    const kafka = new Kafka({
      clientId: 'marketplace',
      brokers: [BROKERS_URL]
    })
    return kafka.consumer({ groupId: 'marketplace' })
  }

  static async send (topic: string, message: any): Promise<void> {
    try {
      console.log('Sending message to topic', topic, message)

      const producer = await KafkaHelper.producer()
      console.log('Connecting to producer')

      await producer.connect()
      console.log('Connected to producer')
      await producer.send({
        topic,
        messages: [
          { value: JSON.stringify(message) }
        ]
      })
      console.log('Message sent to topic', topic, message)
      await producer.disconnect()
    } catch (error) {
      console.log(error)
    }
  }

  static async subscribe (topic: string, callback: (message: any) => void): Promise<void> {
    const consumer = await KafkaHelper.consumer()
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        callback(message.value && JSON.parse(message?.value.toString()))
      }
    })
  }
}
