var prefs = {};
const classes = [ 'titan', 'warlock', 'hunter' ];
const activities = [ 'strikes', 'gambit', 'crucible', 'poh', 'nf100k', 'mnh', 'gos' ];

Zepto(function ($) {
    const render = function ($container, prefs) {
        const $table = $('<table />');
        $table.append($('<tr><th>Activity</th><th>Titan</th><th>Warlock</th><th>Hunter</th></tr>'));

        $table.append(getRow('Strikes', 'strikes-titan', prefs.titan.strikes, 'strikes-warlock', prefs.warlock.strikes, 'strikes-hunter', prefs.hunter.strikes));
        $table.append(getRow('Gambit', 'gambit-titan', prefs.titan.gambit, 'gambit-warlock', prefs.warlock.gambit, 'gambit-hunter', prefs.hunter.gambit));
        $table.append(getRow('Crucible', 'crucible-titan', prefs.titan.crucible, 'crucible-warlock', prefs.warlock.crucible, 'crucible-hunter', prefs.hunter.crucible));
        $table.append(getRow('Pit', 'poh-titan', prefs.titan.poh, 'poh-warlock', prefs.warlock.poh, 'poh-hunter', prefs.hunter.poh));
        $table.append(getRow('100k', 'nf100k-titan', prefs.titan.nf100k, 'nf100k-warlock', prefs.warlock.nf100k, 'nf100k-hunter', prefs.hunter.nf100k));
        $table.append(getRow('MNH', 'mnh-titan', prefs.titan.mnh, 'mnh-warlock', prefs.warlock.mnh, 'mnh-hunter', prefs.hunter.mnh));
        $table.append(getRow('GoS', 'gos-titan', prefs.titan.gos, 'gos-warlock', prefs.warlock.gos, 'gos-hunter', prefs.hunter.gos));

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

    const getRow = function (label, titanId, titanChecked, warlockId, warlockChecked, hunterId, hunterChecked) {
        var markup = '<tr><td>' + label + '</td><td><input id="' + titanId + '" type="checkbox" ';
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
        $.each(classes, function (c, classItem) {
            $.each(activities, function (a, activityItem) {
                $('#' + activityItem + '-' + classItem).on('click', changeItem);
            });
        });
    }

    const resetCheckboxes = function () {
        $.each(classes, function (c, classItem) {
            $.each(activities, function (a, activityItem) {
                $('#' + activityItem + '-' + classItem).prop('checked', false);
            });
        });
    }

    const changeItem = function (event) {
        const $target = $(event.target);
        const spl = $target.attr('id').split('-'); 
        // spl[0] = activity, spl[1] = class
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
        return {
            titan: {
                strikes: 0,
                gambit: 0,
                crucible: 0,
                poh: 0,
                nf000k: 0,
                mnh: 0,
                gos: 0
            },
            warlock: {
                strikes: 0,
                gambit: 0,
                crucible: 0,
                poh: 0,
                nf000k: 0,
                mnh: 0,
                gos: 0
            },
            hunter: {
                strikes: 0,
                gambit: 0,
                crucible: 0,
                poh: 0,
                nf000k: 0,
                mnh: 0,
                gos: 0
            }
        };
    }

    checkStorage();

});