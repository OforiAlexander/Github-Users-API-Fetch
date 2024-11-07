import User from '../models/GitUsers.js';
import axios from 'axios';

class UsersController {
    static async fetchAndStoreUsers(req, res) {
        try {
            const { since = 0, per_page = 30 } = req.query;
            
            // Fetch users from the github API
            const response = await axios.get(`${process.env.GITHUB_API_URL}`, {
                params: {
                    since,
                    per_page
                }
            });

            // Store users from github api into users database
            const users = await Promise.all(
                response.data.map(async (githubUser) => {
                    const [user] = await User.findOrCreate({
                        where: { github_id: githubUser.id },
                        defaults: {
                            username: githubUser.login,
                            avatar_url: githubUser.avatar_url,
                            github_id: githubUser.id
                        }
                    });
                    return user;
                })
            );

            return res.status(201).json({
                success: true,
                message: 'Users fetched and stored successfully',
                data: users
            });
        } catch (error) {
            console.error('Error encounted whiles fetching the github users data and trying to store it:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch and store users',
                error: error.message
            });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await User.findAll({
                order: [['id', 'ASC']]
            });

            return res.json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error('Error in retrieving the posted github users data from the database:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve users',
                error: error.message
            });
        }
    }
}

export default UsersController;