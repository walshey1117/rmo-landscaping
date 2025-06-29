import { describe, expect, it, beforeEach } from '@jest/globals'

import { POST } from '../route'

// Mock modules first, before any other code
jest.mock('../../../../../lib/prisma', () => {
  const mockFindUnique = jest.fn()
  const mockCreate = jest.fn()
  return {
    prisma: {
      user: {
        findUnique: mockFindUnique,
        create: mockCreate,
      },
    },
    _mockFindUnique: mockFindUnique,
    _mockCreate: mockCreate,
  }
})

jest.mock('../../../../../lib/auth', () => {
  const mockHashPassword = jest.fn()
  return {
    hashPassword: mockHashPassword,
    _mockHashPassword: mockHashPassword,
  }
})

// Get the mock functions
const { _mockFindUnique: mockFindUnique, _mockCreate: mockCreate } = jest.requireMock('../../../../../lib/prisma')
const { _mockHashPassword: mockHashPassword } = jest.requireMock('../../../../../lib/auth')

describe('POST /api/auth/register', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'CUSTOMER',
  }

  beforeEach(() => {
    mockFindUnique.mockReset()
    mockCreate.mockReset()
    mockHashPassword.mockReset()
  })

  const createRequest = (body: any): Request => {
    return new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
  }

  it('should create a new user successfully', async () => {
    const hashedPassword = 'hashedPassword123'
    mockHashPassword.mockResolvedValueOnce(hashedPassword)
    mockFindUnique.mockResolvedValueOnce(null)
    mockCreate.mockResolvedValueOnce(mockUser)

    const response = await POST(
      createRequest({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })
    )
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.message).toBe('User created successfully')
    expect(data.user).toEqual(mockUser)

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    })

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
        role: 'CUSTOMER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })
  })

  it('should return 400 if required fields are missing', async () => {
    const response = await POST(
      createRequest({
        email: 'test@example.com',
        name: 'Test User',
      })
    )
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Missing required fields')
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('should return 400 if user already exists', async () => {
    mockFindUnique.mockResolvedValueOnce(mockUser)

    const response = await POST(
      createRequest({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })
    )
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('User already exists')
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('should return 500 if database operation fails', async () => {
    mockFindUnique.mockResolvedValueOnce(null)
    mockCreate.mockRejectedValueOnce(new Error('Database error'))

    const response = await POST(
      createRequest({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })
    )
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.message).toBe('Error creating user')
  })

  it('should hash the password before saving', async () => {
    const hashedPassword = 'hashedPassword123'
    mockHashPassword.mockResolvedValueOnce(hashedPassword)
    mockFindUnique.mockResolvedValueOnce(null)
    mockCreate.mockResolvedValueOnce(mockUser)

    await POST(
      createRequest({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })
    )

    expect(mockHashPassword).toHaveBeenCalledWith('password123')
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          password: hashedPassword,
        }),
      })
    )
  })
})
