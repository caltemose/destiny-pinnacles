var prefs = {};
const classes = [ 'titan', 'warlock', 'hunter' ];
// const activities = [ 'strikes', 'gambit', 'crucible', 'poh', 'nf100k', 'mnh', 'gos' ];

const levels = [
    'power1',
    'power2',
    'power3',
    'pinnacle',
];

const activities = [
    { name: 'banshee_bounties', label: 'Banshee Bounties', level: 1 },
    { name: 'strikes', label: 'Strikes', level: 4 },
    { name: 'strikes_bounties', label: 'Strike Bounties', level: 1 },
    { name: 'crucible', label: 'Crucible', level: 4 },
    { name: 'crucible_bounties', label: 'Crucible Bounties', level: 1 },
    { name: 'gambit', label: 'Gambit', level: 4 },
    { name: 'gambit_bounties', label: 'Gambit Bounties', level: 1 },
    { name: 'exo_challenge', label: 'Exo Challenge', level: 4 },
    { name: 'exo_stranger', label: 'Exo Stranger', level: 1 },
    { name: 'variks_bounties', label: 'Variks Bounties', level: 1 },
    { name: 'prophecy', label: 'Prophecy Dungeon', level: 4 },
    { name: 'dsc', label: 'DSC Raid', level: 4 },
    { name: 'wrathborn_hunts', label: 'Wrathborn Hunts', level: 4 },
    { name: 'wrathborn_celebrant', label: 'Wrathborn High Celebrant', level: 4 },
    { name: 'nightfall_100k', label: '100k Nightfall', level: 4 },
    { name: 'nightfall', label: 'Nightfall Powerfull', level: 1 },
    { name: 'empire_master', label: 'Empire Hunt Master', level: 4 },
    { name: 'empire', label: 'Empire Hunt Powerfull', level: 1 },
];

const activityKeys = Object.keys(activities);

Zepto(function ($) {
    const render = function ($container, prefs) {
        const $table = $('<table />');
        $table.append($('<tr><th>Activity</th><th>Titan</th><th>Warlock</th><th>Hunter</th></tr>'));

        activityKeys.forEach(key => {
            const activity = activities[key];
            $table.append(getRow(activity, `${activity.name}-titan`, prefs.titan[activity.name], `${activity.name}-warlock`, prefs.warlock[activity.name], `${activity.name}-hunter`, prefs.hunter[activity.name]));
        });
        $container.append($table);
        
        activateCheckboxes();
        addResetButton($container);
    }

    const addResetButton = function ($container) {
        const $reset = $('<button />', { id: 'reset', text: 'Reset' });
        $container.append($reset);
        $reset.on('click', reset);
    }
    
    const reset = function () {
        prefs = getDefaultPrefs();
        window.localStorage.setItem('d2pinnacles', JSON.stringify(prefs));
        resetCheckboxes();
    }

    const getRow = function (activity, titanId, titanChecked, warlockId, warlockChecked, hunterId, hunterChecked) {
        var markup = `<tr class="level-${levels[activity.level-1]}"><td>` + activity.label + '</td><td><input id="' + titanId + '" type="checkbox" ';
        markup += titanChecked ? 'checked />' : '/>';
        markup += '<label for="' + titanId + '"></label></td>';
        
        markup += '<td><input id="' + warlockId + '" type="checkbox" ';
        markup += warlockChecked ? 'checked />' : '/>';
        markup += '<label for="' + warlockId + '"></label>';
        markup += '</td>';

        markup += '<td><input id="' + hunterId + '" type="checkbox" ';
        markup += hunterChecked ? 'checked />' : '/>';
        markup += '<label for="' + hunterId + '"></label>';
        markup += '</td>';

        return $(markup);
    }

    const activateCheckboxes = function () {
        $.each(classes, function (c, className) {
            $.each(activities, function (a, activityItem) {
                $('#' + activityItem.name + '-' + className).on('click', changeItem);
            });
        });
    }

    const resetCheckboxes = function () {
        $.each(classes, function (c, className) {
            $.each(activities, function (a, activityItem) {
                $('#' + activityItem.name + '-' + className).prop('checked', false);
            });
        });
    }

    const changeItem = function (event) {
        const $target = $(event.target);
        const spl = $target.attr('id').split('-'); 
        updateStorage(spl[1], spl[0], $target.is(':checked'));
    }

    const updateStorage = function (guardianClass, activity, value) {
        prefs[guardianClass][activity] = value ? 1 : 0;
        window.localStorage.setItem('d2pinnacles', JSON.stringify(prefs));
    }

    const checkStorage = function () {
        prefs = window.localStorage.getItem('d2pinnacles');
        if (!prefs) prefs = getDefaultPrefs();
        else prefs = JSON.parse(prefs);
        console.log(prefs);
        render($('main'), prefs);
    }

    const getDefaultPrefs = function () {
        const prefs = {titan: {}, warlock: {}, hunter: {}};
        classes.forEach(function (cla) {
            activityKeys.forEach(key => {
                const activity = activities[key];
                prefs[cla][activity.name] = 0;
            });
        });
        return prefs;
    }

    checkStorage();

});