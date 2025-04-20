function doSomethingLeft2 () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 110)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
    basic.pause(7000)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 170)
    basic.pause(1000)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
    basic.pause(2000)
}
function StopMotors () {
    maqueen.motorStop(maqueen.Motors.All)
}
function WaitUntilDistanceMM (distance_mm: number) {
    startDistance_mm = singleEncoder.getDistance()
    while (singleEncoder.getDistance() - startDistance_mm < distance_mm) {
        basic.pause(20)
    }
}
function Runrun () {
    if (color == 1 || color == 0) {
        if (color == 1) {
            detection = 1
            doSomethingLeft2()
            detection = 0
            StopMotors()
        }
    }
    if (color == 2) {
        detection = 1
        doSomethingRight()
        detection = 0
        StopMotors()
    }
}
function Endflower2 () {
    bougiewoogie = 1
}
function doTurnRight (speed: number, time_ms: number) {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    basic.pause(time_ms)
}
function doVL53L1X () {
    distance = VL53L1X.readSingle()
    serial.writeValue("dist", distance)
    if (distance < 70) {
        maqueen.motorStop(maqueen.Motors.All)
    }
}
function doTurnLeft (speed: number, time_ms: number) {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
    basic.pause(time_ms)
}
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Skull)
    color = 1
    radio.sendNumber(1)
    radio.sendString("YELLOW")
})
function doUltraSonic () {
    distance = maqueen.Ultrasonic()
    serial.writeValue("dist", distance)
    if (distance < 15) {
        serial.writeValue("x", 1)
        maqueen.motorStop(maqueen.Motors.All)
    } else {
    	
    }
}
function runUntilDistanceMM (distance_mm: number, speed: number) {
    startDistance_mm = singleEncoder.getDistance()
    while (singleEncoder.getDistance() - startDistance_mm < distance_mm) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
        serial.writeValue("dist", singleEncoder.getDistance())
    }
    StopMotors()
}
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Diamond)
    color = 2
    radio.sendNumber(2)
    radio.sendString("BLUE")
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    basic.pause(1000)
    detection = 1
    Runrun()
    Endflower2()
    maqueen.motorStop(maqueen.Motors.All)
    detection = 0
})
function doSomethingRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 120)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 110)
    basic.pause(7000)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 170)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    basic.pause(1000)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
    basic.pause(2000)
}
input.onLogoEvent(TouchButtonEvent.Released, function () {
    basic.pause(2000)
    maqueen.servoRun(maqueen.Servos.S1, 90)
    maqueen.servoRun(maqueen.Servos.S2, 90)
    servos.P0.setAngle(90)
})
let tirette = 0
let distance = 0
let color = 0
let startDistance_mm = 0
let singleEncoder: SingleMagEncoder.SingleMagEncoder = null
let detection = 0
let bougiewoogie = 0
let duration = 85000
serial.redirectToUSB()
Maqueen_V5.I2CInit()
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
VL53L1X.setMeasurementTimingBudget(50000)
bougiewoogie = 0
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Resistive)
detection = 0
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
radio.setGroup(169)
singleEncoder = SingleMagEncoder.createSingleMagEncoder(
false,
true,
true,
130000
)
singleEncoder.start()
basic.clearScreen()
maqueen.motorStop(maqueen.Motors.All)
maqueen.servoRun(maqueen.Servos.S2, 90)
basic.forever(function () {
    while (color == 0) {
        basic.pause(100)
    }
    // DFRobotMaqueenPlus.clearDistance(Motors.ALL)
    while (input.pinIsPressed(TouchPin.P0)) {
        tirette = 0
        if (color == 2) {
            basic.showIcon(IconNames.Diamond)
        } else {
            basic.showIcon(IconNames.Skull)
        }
        basic.pause(200)
    }
    radio.sendNumber(44)
    tirette = 1
    if (singleEncoder.getEncoder1Connected()) {
        singleEncoder.reset()
        singleEncoder.resetTotalCount()
    }
    basic.clearScreen()
    basic.showIcon(IconNames.Angry)
    basic.pause(duration)
    detection = 1
    Runrun()
    Endflower2()
    basic.pause(500)
    while (true) {
        basic.showString("F")
    }
})
control.inBackground(function () {
    while (true) {
        singleEncoder.getValues()
        serial.writeValue("dist", singleEncoder.getDistance())
        if (singleEncoder.getEncoder1Connected()) {
        	
        }
        if (detection == 1) {
            doVL53L1X()
        }
        if (bougiewoogie == 1) {
            maqueen.servoRun(maqueen.Servos.S2, 110)
            basic.pause(200)
            maqueen.servoRun(maqueen.Servos.S2, 60)
            basic.pause(200)
        }
    }
})
