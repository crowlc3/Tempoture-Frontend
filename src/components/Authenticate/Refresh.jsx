
import React, { Component, createContext } from "react";
export const RefreshContext = createContext({ access_token: null, refresh_token: null, last_refreshed: null });


class Refresh extends Component {
    state = {
        access_token: null,
        refresh_token: null,
        last_refreshed: null,
    };

    componentDidMount = () => {
        window.addEventListener("storage", e => {
            let c_access_token = localStorage.getItem('access_token');
            let c_refresh_token = localStorage.getItem('refresh_token');
            let c_last_refreshed = localStorage.getItem('last_refreshed');
            this.setState({
                access_token: c_access_token,
                refresh_token: c_refresh_token,
                last_refreshed: c_last_refreshed
            });
        });
        let access_token = localStorage.getItem('access_token');
        if (access_token != null) {
            let refresh_token = localStorage.getItem('refresh_token');
            let last_refreshed = localStorage.getItem('last_refreshed');
            var d = new Date();
            var n = d.getTime();
            if (n - last_refreshed >= 3600000) {
                fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    body: new URLSearchParams({
                        'grant_type': 'refresh_token',
                        'refresh_token': refresh_token,
                        'client_id': process.env.REACT_APP_CLIENT_ID,
                        'client_secret': process.env.REACT_APP_CLIENT_SECRET
                    }),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        let last_refreshed = d.getTime();
                        localStorage.setItem('access_token', data.access_token);
                        localStorage.setItem('last_refreshed', last_refreshed);
                        this.setState({
                            access_token: data.access_token,
                            last_refreshed: last_refreshed
                        });
                    })
            }
        }

    }

    render() {
        return (
            <RefreshContext.Provider value={this.state.access_token}>
                {this.props.children}
            </RefreshContext.Provider>
        );
    }
}
export default Refresh;