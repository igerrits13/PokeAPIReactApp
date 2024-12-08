const SortOptions = () => {
    // var showTypes = false;

    // function showTypesOptions() {
    //     var typesOptions = document.getElementById("typesOptions");
    //     if(!showTypes) {
    //         typesOptions.style.display = "block";
    //         showTypes = true;
    //     }
    //     else {
    //         typesOptions.style.display = "none";
    //         showTypes = false;
    //     }
    // }

    var expanded = false;

    function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }

    return <div className="sortoptions-container">
            <div className="sortoptions-item sortoption-text">
                <label for="generation">Filter by Generation</label>
                <select name="generation" id="generation">
                    <option value="volvo">All</option>
                    <option value="volvo">Gen 1</option>
                    <option value="saab">Gen 2</option>
                    <option value="saab">Gen 3</option>
                    <option value="saab">Gen 4</option>
                    <option value="saab">Gen 5</option>
                </select>
            </div>
            <div className="sortoptions-item sortoption-text">
            <label for="types">Filter by Type</label>
                <select name="types" id="types">
                    <option value="volvo">All</option>
                    <option value="volvo">Fire</option>
                    <option value="saab">Ice</option>
                    <option value="saab">Normal</option>
                    <option value="saab">Ghost</option>
                    <option value="saab">Sand</option>
                <label for="one">
                    <input type="checkbox" id="one" />First checkbox</label>
                <label for="two">
                    <input type="checkbox" id="two" />Second checkbox</label>
                <label for="three">
                    <input type="checkbox" id="three" />Third checkbox</label>
                </select>
            </div>

            {/* <form>
                <div class="multiselect">
                    <div class="selectBox" onclick="showCheckboxes()">
                    <select>
                        <option>Select an option</option>
                    </select>
                    <div class="overSelect"></div>
                    </div>
                    <div id="checkboxes">
                    <label for="one">
                        <input type="checkbox" id="one" />First checkbox</label>
                    <label for="two">
                        <input type="checkbox" id="two" />Second checkbox</label>
                    <label for="three">
                        <input type="checkbox" id="three" />Third checkbox</label>
                    </div>
                </div>
            </form> */}

            <div className="sortoptions-item sortoption-text">
            <label for="sortby">Sort by</label>
                <select name="sortby" id="sortby">
                    <option value="volvo">Number</option>
                    <option value="volvo">Name</option>
                </select>
            </div>
        </div>
}

export default SortOptions