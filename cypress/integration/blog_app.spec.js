import { func } from "prop-types"

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://46.101.16.81:3042/api/testing/reset')
        const user = {
            name: 'letmein',
            username: 'letmein',
            password: '123'
        }
        cy.request('POST', 'http://46.101.16.81:3042/api/users/', user)
        cy.visit('http://localhost:3000/')
    })
    // it('Login form is shown', function () {
    //     cy.contains('Blog App')

    // })

    it('succeeds with correct credentials', function () {
        cy.contains('login').click()
        cy.get('#username').type('letmein')
        cy.get('#password').type('123')
        cy.get('#login-button').click()
        //cy.contains('letmeinname logged in')
    })

    // it('fails with wrong credentials', function () {
    //     cy.contains('login').click()
    //     cy.get('#username').type('hhh')
    //     cy.get('#password').type('123')
    //     cy.get('#login-button').click()
    //     cy.get('#notifClass').contains("Wrong Username of Password")
    //     //cy.contains('letmeinname logged in')
    // })
    describe('when logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://46.101.16.81:3042/api/login', {
                username: 'letmein', password: '123'
            }).then(response => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })
        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#titleInput').type('BlogTitle')
            cy.get('#urlInput').type('newInput.com')
            cy.get('#saveBtn').click();

            cy.contains('new blog').click()
            cy.get('#titleInput').type('AnotherBlogTitle')
            cy.get('#urlInput').type('newInput.com')
            cy.get('#saveBtn').click();

            cy.contains('Likes').map(x=>{console.log(x)})
           // cy.contains('Show').click();
            //cy.contains('Like').click();
             //cy.contains('Remove').click();
        })
     
        // describe('when logged in', function () {
        //     beforeEach(function () {
        //         cy.request('POST', 'http://46.101.16.81:3042/api/login', {
        //             username: 'letmein', password: '123'
        //         }).then(response => {
        //             localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        //             cy.visit('http://localhost:3000')
        //         })
        //     })
        //     it('User can delete', function () {
        //         cy.contains('Remove').click();
        //     })
        // })
    })
})