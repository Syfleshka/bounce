export interface BallPosition {
  x: number
  y: number
}

export interface Velocity {
  x: number
  y: number
}

export interface SavedParams {
  ballPosition: BallPosition
  velocity: Velocity
  gravity: number
  velocityLoss: Velocity
}
