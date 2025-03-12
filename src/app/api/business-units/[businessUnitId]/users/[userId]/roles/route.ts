import { NextRequest, NextResponse } from 'next/server'
import { userService } from '@/services/userService'
import { ErrorResponse } from '@/types/user'

// Helper to validate system authentication
const validateSystemAuth = (req: NextRequest) => {
  const systemId = req.headers.get('x-system-id')
  const apiKey = req.headers.get('x-api-key')
  
  if (!systemId || !apiKey) {
    return false
  }
  
  // TODO: Implement proper API key validation
  return true
}

// Helper to handle errors
const handleError = (error: Error): NextResponse<ErrorResponse> => {
  console.error('Error in roles API:', error)
  return NextResponse.json(
    { error: error.message || 'Internal Server Error', code: 'INTERNAL_ERROR' },
    { status: 500 }
  )
}

// GET /api/business-units/[businessUnitId]/users/[userId]/roles
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ businessUnitId: string; userId: string }> }
) {
  try {
    if (!validateSystemAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    const { businessUnitId, userId } = await params
    const roles = await userService.getUserRoles(businessUnitId, userId)
    
    return NextResponse.json(roles)
  } catch (error) {
    return handleError(error as Error)
  }
}

// POST /api/business-units/[businessUnitId]/users/[userId]/roles
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ businessUnitId: string; userId: string }> }
) {
  try {
    if (!validateSystemAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    const { businessUnitId, userId } = await params
    const { roles } = await request.json()
    
    const result = await userService.addRoles(businessUnitId, userId, roles)
    return NextResponse.json(result)
  } catch (error) {
    return handleError(error as Error)
  }
}

// DELETE /api/business-units/[businessUnitId]/users/[userId]/roles
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ businessUnitId: string; userId: string }> }
) {
  try {
    if (!validateSystemAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    const { businessUnitId, userId } = await params
    const { roles } = await request.json()
    
    const result = await userService.removeRoles(businessUnitId, userId, roles)
    return NextResponse.json(result)
  } catch (error) {
    return handleError(error as Error)
  }
}

// PUT /api/business-units/[businessUnitId]/users/[userId]/roles
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ businessUnitId: string; userId: string }> }
) {
  try {
    if (!validateSystemAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    const { businessUnitId, userId } = await params
    const { roles } = await request.json()
    
    const result = await userService.syncRoles(businessUnitId, userId, roles)
    return NextResponse.json(result)
  } catch (error) {
    return handleError(error as Error)
  }
}
