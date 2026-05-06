# Student Canteen — Developer Documentation

A full-stack management system for a student canteen. Allows staff to manage
students, meals and orders through a browser-based dashboard.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started](#3-getting-started)
4. [Backend](#4-backend)
5. [Frontend Architecture](#5-frontend-architecture)
6. [SCSS Design System](#6-scss-design-system)
7. [Data Flow Pattern](#7-data-flow-pattern)
8. [Adding a New Entity](#8-adding-a-new-entity)

---

## 1. Project Structure

```
Student_Canteen_Project/
│
├── config/
│   └── database.ts          # MySQL connection pool (reads from .env)
│
├── controllers/
│   ├── meal.controller.ts   # HTTP handlers for /meals routes
│   ├── order.controller.ts  # HTTP handlers for /orders routes
│   └── student.controller.ts
│
├── models/
│   ├── meal.model.ts        # Raw SQL queries for the meal table
│   ├── order.model.ts       # Raw SQL queries for the orders table
│   └── student.model.ts
│
├── routes/
│   ├── meal.routes.ts       # Wires Express router to meal controller
│   ├── order.routes.ts
│   └── student.routes.ts
│
├── services/
│   ├── meal.service.ts      # Business logic layer (sits between controller and model)
│   ├── order.service.ts
│   └── student.service.ts
│
├── types/
│   ├── Meal.ts              # Shared TypeScript interfaces (used by both BE and FE)
│   ├── Order.ts
│   └── Student.ts
│
├── index.ts                 # Express app entry point
├── .env                     # Environment variables (never commit this)
│
└── frontend/
    └── src/
        ├── App.tsx              # Router root — maps URLs to page components
        ├── main.tsx             # React entry point, imports global SCSS
        │
        ├── components/          # Reusable UI pieces, not tied to any route
        │   ├── index.ts         # Barrel export — import everything from "../components"
        │   ├── Layout.tsx       # Wraps every page: sidebar nav + <Outlet />
        │   ├── Navigation.tsx   # Sidebar links using NavLink (handles active state)
        │   ├── MealList.tsx
        │   ├── StudentList.tsx
        │   ├── OrderList.tsx
        │   ├── CreateMealForm.tsx
        │   ├── UpdateMealForm.tsx
        │   ├── CreateStudentForm.tsx
        │   ├── UpdateStudentForm.tsx
        │   ├── CreateOrderForm.tsx
        │   └── UpdateOrderForm.tsx
        │
        ├── pages/               # One file per route
        │   ├── index.ts         # Barrel export
        │   ├── Home.tsx
        │   ├── About.tsx
        │   ├── Contact.tsx
        │   ├── NotFound.tsx     # Shown for any unmatched URL
        │   ├── MealOverview.tsx
        │   ├── StudentOverview.tsx
        │   └── OrderOverview.tsx
        │
        └── styles/
            ├── index.scss       # Entry point: variables, reset, base, imports partials
            ├── _layout.scss     # Sidebar nav and main content area
            └── _components.scss # Buttons, forms, lists, static pages, 404
```

---

## 2. Tech Stack

### Backend
| Piece | Choice | Why |
|---|---|---|
| Runtime | Node.js | |
| Framework | Express 5 | Async error handling built in |
| Database | MySQL 2 | Promise-based, connection pooling |
| Language | TypeScript | Shared types with the frontend |
| Dev server | nodemon | Restarts on file change |

### Frontend
| Piece | Choice | Why |
|---|---|---|
| Framework | React 19 | |
| Language | TypeScript | |
| Bundler | Vite 8 | Fast HMR, native TS support |
| Routing | react-router v7 | File-based-style nested routes |
| Forms | react-hook-form | Minimal re-renders, built-in validation |
| Styles | SCSS (via sass) | Variables, nesting, partials |

---

## 3. Getting Started

### Prerequisites
- Node.js 20+
- MySQL running locally

### Environment variables
Create a `.env` file in the project root. It is already in `.gitignore` — never
commit it. The required keys are:

```env
PORT=3002

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
DB_NAME=student_canteen
```

### Database setup
Create the database and three tables in MySQL:

```sql
CREATE DATABASE student_canteen;
USE student_canteen;

CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    faculty_number VARCHAR(50) NOT NULL
);

CREATE TABLE meal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(6,2) NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    meal_id INT NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (meal_id) REFERENCES meal(id)
);
```

### Running the backend
```bash
# From the project root
npm install
npm run dev        # starts nodemon on the port defined in .env (default 3002)
```

### Running the frontend
```bash
# From frontend/
npm install
npm run dev        # starts Vite dev server, usually http://localhost:5173
```

Both servers must be running at the same time for the app to work. The frontend
talks directly to `http://localhost:3002` — there is no proxy configured.

---

## 4. Backend

### Architecture: Controller → Service → Model

Every entity follows the same three-layer pattern. A request hits a route, which
calls a controller method, which calls a service method, which calls a model
method. Nothing skips a layer.

```
HTTP request
    → router          (routes/meal.routes.ts)
    → controller      (controllers/meal.controller.ts)   handles req/res, parses params
    → service         (services/meal.service.ts)         business logic lives here
    → model           (models/meal.model.ts)             executes SQL, returns typed data
    → MySQL
```

The reason for the service layer — even when it currently just proxies the model
— is that business logic (e.g. "you can't delete a student who has active orders")
belongs there, not in the controller or the SQL.

### API reference

All responses wrap data in the same envelope:
```json
{ "message": "...", "data": "..." }
```

#### Students — `/students`
| Method | Path | Description |
|---|---|---|
| GET | `/students` | Returns all students |
| GET | `/students/:id` | Returns one student or 404 |
| POST | `/students` | Creates a student — body: `{ name, faculty_number }` |
| PUT | `/students/:id` | Updates a student — body: partial `{ name?, faculty_number? }` |
| DELETE | `/students/:id` | Deletes a student |

#### Meals — `/meals`
| Method | Path | Description |
|---|---|---|
| GET | `/meals` | Returns all meals |
| GET | `/meals/:id` | Returns one meal or 404 |
| POST | `/meals` | Creates a meal — body: `{ name, price }` |
| PUT | `/meals/:id` | Updates a meal — body: partial `{ name?, price? }` |
| DELETE | `/meals/:id` | Deletes a meal |

#### Orders — `/orders`
| Method | Path | Description |
|---|---|---|
| GET | `/orders` | Returns all orders |
| GET | `/orders/:id` | Returns one order or 404 |
| POST | `/orders` | Creates an order — body: `{ student_id, meal_id, order_date }` |
| PUT | `/orders/:id` | Updates an order — body: partial |
| DELETE | `/orders/:id` | Deletes an order |

### Shared types
The `types/` folder at the project root is shared between backend and frontend.
The frontend imports from `"../../../types/..."` (three levels up from
`frontend/src/components/`). If you move files, update these import paths.

---

## 5. Frontend Architecture

### Routing (`App.tsx`)
`App.tsx` is intentionally thin — it only maps URLs to page components. All
state, fetching and logic lives inside the pages themselves.

```tsx
<Route element={<Layout />}>          // Layout wraps every page
    <Route path="/" element={<Home />} />
    <Route path="/students" element={<StudentOverview />} />
    <Route path="/meals" element={<MealOverview />} />
    <Route path="/orders" element={<OrderOverview />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/*" element={<NotFound />} />   // catch-all
</Route>
```

### Layout and Navigation
`Layout.tsx` renders the sidebar (`Navigation`) and an `<Outlet />` — the
React Router placeholder where the matched page component is injected.

`Navigation.tsx` uses `NavLink` (not `Link`). `NavLink` automatically receives
an `active` class when its `to` path matches the current URL, which is what
drives the highlighted state in the sidebar. The `end` prop on the Home link
prevents it staying active on every page (since every path starts with `/`).

### Pages — the Overview pattern
Each entity has one Overview page (`MealOverview`, `StudentOverview`,
`OrderOverview`). The Overview owns all state and data fetching for that entity
and decides which of three views to render:

```
creatingX === true          → show Create form
xToBeUpdated !== null       → show Update form
neither                     → show List
```

Only one view is ever visible at a time. This is enforced by the conditional
rendering in the return block — if both booleans are false and the update target
is null, the list renders.

`refreshX()` is the single reset function: it re-fetches from the API and sets
all UI state back to the default (list view). It is passed down to the forms as
the `refresh` prop so they can trigger it after a successful submit or cancel.

### OrderOverview — why it's different
Orders reference both a student and a meal by ID. To show human-readable names
in the list and dropdowns in the forms, `OrderOverview` fetches all three
endpoints in parallel using `Promise.all` on mount. The resolved arrays are
passed as props to `OrderList`, `CreateOrderForm` and `UpdateOrderForm`, which
use them as lookup tables.

### Forms — react-hook-form
All forms use `react-hook-form`. Key points:

- `register(fieldName, { required: "..." })` wires an input to the form and
  adds validation rules.
- `handleSubmit(fn)` runs validation before calling `fn` with the typed data.
- `formState.errors` holds per-field error messages.
- `useWatch({ control, name })` reactively reads a field's current value without
  causing the whole form to re-render — used in the order forms to drive the
  live preview boxes below the dropdowns.
- Update forms receive `defaultValues` so inputs are pre-populated with the
  existing record's data.

### Barrel exports (`index.ts`)
Both `components/` and `pages/` have an `index.ts` that re-exports everything.
This means imports stay clean:

```ts
// instead of:
import { MealList } from "../components/MealList.tsx";
import { CreateMealForm } from "../components/CreateMealForm.tsx";

// you write:
import { MealList, CreateMealForm } from "../components";
```

When you add a new component or page, add it to the relevant `index.ts`.

---

## 6. SCSS Design System

Styles live in `frontend/src/styles/` and are imported once in `main.tsx`.

### File structure
```
styles/
├── index.scss       # @use imports (must be first), then variables, reset, base
├── _layout.scss     # .layout, .nav, .main
└── _components.scss # Everything else
```

**Important:** `@use` statements must appear before any other rules in SCSS.
This is why the partial imports are at the very top of `index.scss`.

### CSS custom properties (variables)
All design tokens are defined as CSS custom properties on `:root` in
`index.scss`. Use them everywhere — never hardcode a colour or spacing value.

```scss
// Colours
--clr-bg          dark background
--clr-surface     slightly lighter surface (cards, sidebar)
--clr-surface-2   hover state surface
--clr-border      subtle border
--clr-border-2    stronger border / hover border

--clr-text        body text
--clr-text-muted  secondary / label text
--clr-heading     headings and prominent values

--clr-accent      amber #f5a623  — primary actions, active states, highlights
--clr-accent-dim  10% opacity accent — backgrounds
--clr-accent-glow 25% opacity accent — shadows and borders

--clr-danger      red — destructive actions
--clr-danger-dim  10% opacity red — hover backgrounds on danger buttons

// Typography
--font-mono       DM Mono — headings, labels, nav, data values
--font-body       Lato — body text and paragraphs

// Spacing scale
--space-xs  4px
--space-sm  8px
--space-md  16px
--space-lg  24px
--space-xl  40px
--space-2xl 64px

// Layout
--nav-width    220px — fixed sidebar width
--content-max  900px — max width of the main content area

// Misc
--radius     6px — standard border radius
--radius-sm  3px — small border radius (inputs, badges)
--ease       cubic-bezier(0.16, 1, 0.3, 1) — snappy ease-out for transitions
```

### Class reference

#### Layout
| Class | Element | Description |
|---|---|---|
| `.layout` | `<div>` in Layout.tsx | Flex container holding sidebar + main |
| `.nav` | `<nav>` | Fixed-position sidebar |
| `.nav__brand` | `<div>` | Top section with app name |
| `.nav__links` | `<div>` | Link list container |
| `.nav__section-label` | `<p>` | Uppercase group label in sidebar |
| `.nav__link` | `<NavLink>` | Individual nav link, gains `.active` automatically |
| `.nav__footer` | `<div>` | Bottom of sidebar — version number |
| `.main` | `<main>` | Scrollable content area, offset by sidebar width |

#### Page header
| Class | Description |
|---|---|
| `.page-header` | Flex row at the top of list pages |
| `.page-header__eyebrow` | Small uppercase label above the title |
| `.page-header__title` | The `<h2>` heading |
| `.page-header__count` | Small pill showing number of items |

#### Data list
| Class | Description |
|---|---|
| `.data-list` | `<ul>` wrapper |
| `.data-list__item` | `<li>` — hover reveals action buttons |
| `.data-list__info` | Flex row holding name, meta and badge |
| `.data-list__name` | Primary label (bold mono) |
| `.data-list__meta` | Secondary info (muted mono) |
| `.data-list__badge` | Highlighted pill (accent colour) |
| `.data-list__actions` | Edit/Delete buttons — hidden until row hover |
| `.data-list__empty` | Shown when the list has no items |

#### Buttons
All buttons use the base `.btn` class plus one modifier:

| Class | Usage |
|---|---|
| `.btn--primary` | Main action — amber fill |
| `.btn--ghost` | Secondary action — bordered, no fill |
| `.btn--danger` | Destructive action — red text, no fill by default |
| `.btn--sm` | Smaller padding, used inside list rows |

#### Forms
| Class | Description |
|---|---|
| `.form-card` | White-bordered card wrapping the form |
| `.form-card__title` | Uppercase label at the top of the card |
| `.form-card__fields` | Vertical stack of rows |
| `.form-card__row` | Horizontal flex row of fields |
| `.form-card__field` | Single label + input + error unit |
| `.form-card__label` | Uppercase field label |
| `.form-card__actions` | Submit/Cancel button row at the bottom |
| `.input` | Applied to every `<input>` and `<select>` |
| `.input-error` | Red error message below a field |

#### Form preview (order forms only)
| Class | Description |
|---|---|
| `.form-preview` | Two-column grid that appears below a dropdown when an option is selected |
| `.form-preview__label` | Left column — muted uppercase label |
| `.form-preview__value` | Right column — accent-coloured value |

#### Static pages
| Class | Description |
|---|---|
| `.static-page` | Wrapper for Home, About, Contact |
| `.static-page__eyebrow` | Small accent-coloured label |
| `.static-page__title` | Large `<h1>` |
| `.static-page__divider` | Short amber horizontal rule |
| `.static-page__body` | Body paragraph |

#### 404
| Class | Description |
|---|---|
| `.not-found` | Wrapper |
| `.not-found__code` | Giant muted "404" |
| `.not-found__message` | Subtitle text |

---

## 7. Data Flow Pattern

Here is the complete flow for a user creating a new meal, as a concrete example
of how everything connects:

```
1. User navigates to /meals
       → React Router renders <MealOverview /> inside <Layout />

2. MealOverview mounts
       → useEffect fires → fetchMeals() → GET /meals
       → setMeals(data) → MealList renders with the meal array

3. User clicks "+ Add Meal"
       → toggleIsCreating() → setCreatingMeal(true)
       → MealList unmounts, CreateMealForm mounts

4. User fills in the form and clicks "Create Meal"
       → react-hook-form validates the fields
       → createMeal(data) fires → POST /meals with JSON body
       → Express router → MealController.create → MealService.createMeal
         → MealModel.create → INSERT INTO meal ... → returns new Meal row
       → Controller responds with 201 + { message, data }

5. fetch() resolves → refresh() is called
       → fetchMeals() re-fetches the full list from the API
       → setCreatingMeal(false) → CreateMealForm unmounts
       → MealList mounts again with the updated meals array
```

---

## 8. Adding a New Entity

If you need to add a fourth entity (e.g. `Category`), follow this checklist:

### Backend
- [ ] Add `types/Category.ts` with `Category` and `CreateCategoryDTO` interfaces
- [ ] Add `models/category.model.ts` — copy `meal.model.ts` as a template
- [ ] Add `services/category.service.ts` — copy `meal.service.ts`
- [ ] Add `controllers/category.controller.ts` — copy `meal.controller.ts`
- [ ] Add `routes/category.routes.ts` — copy `meal.routes.ts`
- [ ] Register the router in `index.ts`: `app.use(categoryRoutes)`

### Frontend
- [ ] Add `frontend/src/components/CategoryList.tsx`
- [ ] Add `frontend/src/components/CreateCategoryForm.tsx`
- [ ] Add `frontend/src/components/UpdateCategoryForm.tsx`
- [ ] Export all three from `frontend/src/components/index.ts`
- [ ] Add `frontend/src/pages/CategoryOverview.tsx` — copy `MealOverview.tsx` as template
- [ ] Export it from `frontend/src/pages/index.ts`
- [ ] Add a route in `App.tsx`: `<Route path="/categories" element={<CategoryOverview />} />`
- [ ] Add a `<NavLink>` in `Navigation.tsx`