document.addEventListener("DOMContentLoaded", () => {
    let ejemplo = [
        { value: 100, text: "Thomas", title: "Thomas contreras" },
        { value: 200, text: "Elias", title: "Elias Betancur" },
        { value: 300, text: "Williams", title: "Williams Parra" },
    ];

    // Second whitelist, which is shown only when starting to type "#".
    // Thiw whitelist is the most simple one possible.

    const whitelist_1 = ejemplo.map((item) => {
        return {
            value: item.value,
            text: `enfermera ${item.text}`,
            title: item.title,
        };
    });

    console.log(whitelist_1);
    // initialize Tagify
    var input = document.querySelector("[name=basic]"),
        // init Tagify script on the above inputs
        tagify = new Tagify(input, {
            //  mixTagsInterpolator: ["{{", "}}"],
            mode: "mix", // <--  Enable mixed-content
            pattern: /@|#/, // <--  Text starting with @ or # (if single, String can be used here)
            tagTextProp: "text", // <-- the default property (from whitelist item) for the text to be rendered in a tag element.
            // Array for initial interpolation, which allows only these tags to be used
            whitelist: whitelist_1.map(function (item) {
                return typeof item == "string" ? { value: item } : item;
            }),
            dropdown: {
                enabled: 1,
                position: "text", // <-- render the suggestions list next to the typed text ("caret")
                mapValueTo: "text", // <-- similar to above "tagTextProp" setting, but for the dropdown items
                highlightFirst: true, // automatically highlights first sugegstion item in the dropdown
            },
            callbacks: {
                add: console.log, // callback when adding a tag
                remove: console.log, // callback when removing a tag
            },
        });

    // A good place to pull server suggestion list accoring to the prefix/value
    tagify.on("input", function (e) {
        var prefix = e.detail.prefix;

        // first, clean the whitlist array, because the below code, while not, might be async,
        // therefore it should be up to you to decide WHEN to render the suggestions dropdown
        // tagify.settings.whitelist.length = 0;

        if (prefix) {
            if (prefix == "@") tagify.whitelist = whitelist_1;

            if (e.detail.value.length > 1) tagify.dropdown.show(e.detail.value);
        }

        console.log(tagify.value);
        console.log('mix-mode "input" event value: ', e.detail);
    });

    tagify.on("add", function (e) {
        console.log("tagify add");
        console.log(e);
    });
});
