import { prisma } from '../../../../lib/prisma'
import { hashPassword } from '../../../../lib/auth'

const jsonResponse = (data: any, status: number = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password || !name) {
      return jsonResponse({ message: 'Missing required fields' }, 400)
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return jsonResponse({ message: 'User already exists' }, 400)
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'CUSTOMER', // Default role for new registrations
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    return jsonResponse({ message: 'User created successfully', user }, 201)
  } catch (error) {
    console.error('Registration error:', error)
    return jsonResponse({ message: 'Error creating user' }, 500)
  }
}
