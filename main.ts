function doSomethingLeft2 () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 185)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 180)
    basic.pause(5000)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
    basic.pause(500)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 120)
    basic.pause(2000)
}
function doSomethingLeft3 () {
    runLeftRight(205, 200, 1200)
    runLeftRight(0, 200, 110)
    runLeftRight(100, 100, 250)
    maqueen.motorStop(maqueen.Motors.All)
    Endflower2()
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
            doSomethingLeft3()
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
function runLeftRight (left: number, right: number, distance_mm: number) {
    init_dist_trajet = distance_parcourue_mm
    dist_run_mm = distance_parcourue_mm - init_dist_trajet
    while (dist_run_mm < distance_mm) {
        serial.writeValue("dist_run_mm", dist_run_mm)
        serial.writeValue("distance_mm", distance_mm)
        if (motor_stop == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, left)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, right)
        } else {
            maqueen.motorStop(maqueen.Motors.All)
        }
        led.plotBarGraph(
        distance,
        300
        )
        basic.pause(10)
        dist_run_mm = distance_parcourue_mm - init_dist_trajet
    }
    maqueen.motorStop(maqueen.Motors.All)
}
function doTurnRight (speed: number, time_ms: number) {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    basic.pause(time_ms)
}
function doVL53L1X () {
    distance = VL53L1X.readSingle()
    serial.writeValue("dist", distance)
    if (distance < 100) {
        motor_stop = 1
    } else {
        motor_stop = 0
    }
}
function doTurnLeft (speed: number, time_ms: number) {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
    basic.pause(time_ms)
}
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Skull)
    bougiewoogie = 0
    color = 1
    radio.sendNumber(1)
    radio.sendNumber(1)
    radio.sendString("YELLOW")
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Diamond)
    bougiewoogie = 0
    color = 2
    radio.sendNumber(2)
    radio.sendNumber(2)
    radio.sendString("BLUE")
})
function runUntilDistanceMMfirst_version_old (distance_mm: number, speed: number) {
    startDistance_mm = singleEncoder.getDistance()
    while (singleEncoder.getDistance() - startDistance_mm < distance_mm) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
        serial.writeValue("dist", singleEncoder.getDistance())
    }
    StopMotors()
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    basic.pause(1000)
    singleEncoder.reset()
    singleEncoder.resetTotalCount()
    distance_parcourue_mm = 0
    detection = 1
    Runrun()
    maqueen.motorStop(maqueen.Motors.All)
    detection = 0
})
function doSomethingRight () {
    runLeftRight(200, 205, 1200)
    runLeftRight(200, 0, 110)
    runLeftRight(100, 100, 250)
    maqueen.motorStop(maqueen.Motors.All)
    Endflower2()
}
input.onLogoEvent(TouchButtonEvent.Released, function () {
	
})
let tirette = 0
let distance = 0
let dist_run_mm = 0
let color = 0
let startDistance_mm = 0
let singleEncoder: SingleMagEncoder.SingleMagEncoder = null
let detection = 0
let init_dist_trajet = 0
let distance_parcourue_mm = 0
let motor_stop = 0
let bougiewoogie = 0
pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Resistive)
bougiewoogie = 0
motor_stop = 0
let duration = 85000
distance_parcourue_mm = 0
init_dist_trajet = 0
detection = 0
serial.redirectToUSB()
Maqueen_V5.I2CInit()
basic.pause(500)
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
VL53L1X.setMeasurementTimingBudget(50000)
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
basic.showIcon(IconNames.Square)
basic.forever(function () {
    while (color == 0) {
        basic.pause(100)
    }
    if (singleEncoder.getEncoder1Connected()) {
        singleEncoder.reset()
        singleEncoder.resetTotalCount()
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
    radio.sendNumber(44)
    radio.sendNumber(44)
    radio.sendNumber(44)
    radio.sendNumber(44)
    basic.pause(50)
    radio.sendNumber(44)
    radio.sendNumber(44)
    radio.sendNumber(44)
    radio.sendNumber(44)
    radio.sendNumber(44)
    tirette = 1
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
        if (singleEncoder.getEncoder1Connected()) {
            singleEncoder.getValues()
            distance_parcourue_mm = singleEncoder.getDistance()
            serial.writeValue("dist parcourue", distance_parcourue_mm)
        }
        basic.pause(30)
        if (detection == 1) {
            doVL53L1X()
        }
        if (bougiewoogie == 1) {
            maqueen.motorStop(maqueen.Motors.All)
            maqueen.servoRun(maqueen.Servos.S2, 110)
            basic.pause(200)
            maqueen.servoRun(maqueen.Servos.S2, 60)
            basic.pause(200)
        }
    }
})
control.inBackground(function () {
    basic.pause(2000)
    while (tirette == 0) {
        basic.pause(200)
    }
    basic.pause(99000)
    Endflower2()
})
