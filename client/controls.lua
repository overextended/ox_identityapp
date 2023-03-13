local disabledKeyList = {
    0, -- Next Camera
    1, -- Look Left/Right
    2, -- Look up/Down
    16, -- Next Weapon
    17, -- Select Previous Weapon
    22, -- Jump
    24, -- Attack
    25, -- Aim
    26, -- Look Behind
    36, -- Input Duck/Sneak
    37, -- Weapon Wheel
    44, -- Cover
    47, -- Detonate
    55, -- Dive
    75, -- Exit Vehicle
    76, -- Vehicle Handbrake
    81, -- Next Radio (Vehicle)
    82, -- Previous Radio (Vehicle)
    91, -- Passenger Aim (Vehicle)
    92, -- Passenger Attack (Vehicle)
    99, -- Select Next Weapon (Vehicle)
    106, -- Control Override (Vehicle)
    114, -- Fly Attack (Flying)
    115, -- Next Weapon (Flying)
    121, -- Fly Camera (Flying)
    122, -- Control OVerride (Flying)
    135, -- Control OVerride (Sub)
    140, -- Melee attack light
    200, -- Pause Menu
    245, -- Chat
}

local isThreadRunning = false
local Wait = Wait
local DisableControlAction = DisableControlAction
local CreateThread = CreateThread

RegisterNUICallback('disable_controls', function(data, cb)
    if isThreadRunning then return end

    isThreadRunning = true

    CreateThread(function()
        while isThreadRunning do
            for i=1, #disabledKeyList do
                DisableControlAction(0, disabledKeyList[i], true)
            end

            Wait(0)
        end
    end)

    print(IsNuiFocusKeepingInput()) -- 1
    SetNuiFocusKeepInput(false)
    print(IsNuiFocusKeepingInput()) -- 1??????

    cb({
        status = 'ok'
    })
end)

RegisterNUICallback('enable_controls', function(data, cb)
    isThreadRunning = false

    SetNuiFocusKeepInput(true)

    cb({
        status = 'ok'
    })
end)