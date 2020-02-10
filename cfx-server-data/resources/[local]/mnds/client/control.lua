

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		
		if (IsControlJustPressed(0, 212)) then
			if true then
                SetNuiFocus(true, true)
                print('mnds:event')
                SendNUIMessage({type = 'mnds:event', action = 'showHelp'})
			end
		end
	end
end)

RegisterNUICallback('close', function(data, cb)
	SetNuiFocus(false)
end)