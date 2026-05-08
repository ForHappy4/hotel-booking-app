# Веб-приложение для бронирования гостиниц

Курсовой fullstack-проект, представляющий собой веб-приложение для просмотра гостиниц, выбора номеров и создания бронирований. Проект включает клиентскую часть на React, серверную часть на LoopBack 4, базу данных MongoDB и Docker-конфигурацию для запуска всех компонентов.

---

## Возможности приложения

* просмотр гостиниц;
* просмотр номеров;
* создание бронирований;
* просмотр бронирований;
* REST API для работы с основными сущностями;
* хранение данных в MongoDB;
* запуск проекта через Docker и Docker Compose.

---

## Технологии

### Backend

* LoopBack 4
* TypeScript
* MongoDB

### Frontend

* React
* Vite
* TypeScript
* Axios

### Infrastructure

* Docker
* Docker Compose
* GitHub Actions

---

## Структура проекта

```text
hotel-booking-app/
├── app/
├── booking_backend/
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

`app/` содержит frontend-приложение на React и Vite.  
`booking_backend/` содержит backend-приложение на LoopBack 4.  
`.github/workflows/` содержит настройки CI/CD.

---

## Запуск проекта через Docker

Для запуска всех сервисов используется Docker Compose:

```bash
docker compose up --build
```

После запуска приложение будет доступно по адресам:

* Frontend: http://localhost:5173
* Backend: http://localhost:3000

---

## Локальный запуск

### Backend

```bash
cd booking_backend
npm install
npm start
```

### Frontend

```bash
cd app
npm install
npm run dev
```

---

## API

### Hotels

* `GET /hotels`
* `POST /hotels`

### Rooms

* `GET /rooms`
* `POST /rooms`

### Bookings

* `GET /bookings`
* `POST /bookings`

---

## CI/CD

В проекте используется GitHub Actions. Workflow выполняет проверку и сборку проекта при отправке изменений в репозиторий.

---

## Заключение

Разработанное приложение автоматизирует базовый процесс бронирования гостиниц: просмотр доступных гостиниц и номеров, создание бронирований и получение информации о них. Проект демонстрирует применение современных web-технологий в учебной fullstack-разработке, включая REST API, клиентское приложение, базу данных и контейнеризацию.
