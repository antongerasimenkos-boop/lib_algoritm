<template>
    <div class="about">
        <!-- <div class="uk-inline uk-position-bottom-center">
            <img alt="Vue logo" src="../assets/404.png" />
            <div class="uk-position-bottom">
                <h1>Запрашиваемая страница не существует</h1>
            </div>
        </div> -->
        <div class="uk-flex uk-flex-center uk-flex-middle uk-background-cover">
            <div class="uk-inline">
                <h1 class="uk-overlay">404</h1>
                <img alt="" src="../assets/404.png" uk-img />
            </div>
            <h2 class="uk-overlay">Запрашиваемая страница не существует</h2>
        </div>
    </div>

    <!-- data-src="../assets/404.png"
            uk-img -->
</template>

<style scoped>
.uk-overlay {
    padding: 10px 30px;
}
</style>
