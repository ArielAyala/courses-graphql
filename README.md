## Using variables

```graphql
mutation AddPersonToCourse2($course: ID!, $person: ID!) {
  addPeople(courseID: $course, personID: $person) {
    _id
    title
  }
}
```
Variables
```graphql
{
  "course": "6134f172e6f1b6adfb085b29",
  "person": "6135257fd1ee61fbda2e6e3b"
}
```

```graphql
query GetCourse2($course: ID!) {
  getCourse(id: $course) {
    _id
    title
    people {
      _id
      name
    }
  }
}
```
Variables
```graphql
{
  "course": "6134f172e6f1b6adfb085b29"
}
```

## Using aliases and fragments

```graphql
{
  AllCourses: getCourses {
    ...CourseFields
  }

  Course1: getCourse(id: "6134f172e6f1b6adfb085b28") {
    ...CourseFields
    teacher
  }

  Course2: getCourse(id: "6134f172e6f1b6adfb085b29") {
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
}
```

## Directives

```graphql
query getPeopleData($monitor: Boolean!, $avatar: Boolean!) {
  getPeople {
    _id
    name
    ... on Monitor @include(if: $monitor) {
      phone
    }
    ... on Student @include(if: $avatar) {
      avatar
      email
    }
  }
}
```

```graphql
{
  "monitor":false,
  "avatar":true
}

```

## Unions

```graphql
{
  searchItems(keyword: "titulo"){
    __typename
    ... on Course {
      title
      description
    }
    ... on Monitor {
      name
      phone
    }
    ... on Student {
      name
      email
    }
  }
}
```


