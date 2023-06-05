import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Seach Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Tech Gym',
      description: 'Only nerds',
      phone: '1499999999',
      latitude: -25.2002004,
      longitude: -44.6001004,
    })

    await inMemoryGymsRepository.create({
      title: 'TS Gym',
      description: null,
      phone: null,
      latitude: -25.2002004,
      longitude: -44.6001004,
    })

    const { gyms } = await sut.execute({
      query: 'Tech',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Tech Gym' })])
  })

  it.skip('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Tech Gym ${i}`,
        description: 'Only nerds',
        phone: '1499999999',
        latitude: -25.2002004,
        longitude: -44.6001004,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Tech',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Tech Gym 21' }),
      expect.objectContaining({ title: 'Tech Gym 22' }),
    ])
  })
})
