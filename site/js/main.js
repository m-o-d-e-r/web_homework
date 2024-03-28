
class SliderItem {
    constructor(img_path, text) {
        this.img_path = img_path
    }
}


data = []
current_index = 0

function fill_data() {
    data.push(
        new SliderItem(
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        ),
        new SliderItem(
            "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        ),
        new SliderItem(
            "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
        ),
        new SliderItem(
            "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711238400&semt=ais"
        ),
    )

    for (let index = 0; index < data.length; index++) {
        $(".slider_paginator").append('<div class="slider_paginator_item"></div>')
    }

    update_slider()
}

function check_current_index() {
    if (current_index < 0) {
        current_index = data.length - 1
    } else if (current_index >= data.length) {
        current_index = 0
    }
}

function update_slider() {
    $(".slider_img").attr("src", data[current_index].img_path)

    $(".paginator_item_active").removeClass("paginator_item_active")
    $(".slider_paginator").children().eq(current_index).addClass("paginator_item_active")
}


function slide_left() {
    current_index--
    check_current_index()
    update_slider()
}


function slide_right() {
    current_index++
    check_current_index()
    update_slider()
}
