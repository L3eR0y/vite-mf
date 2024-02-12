type Profile = {
	attempts_left?: number,
	attributes?: ProfileAttributes,
	id?: string,
	lid?: number,
	meta?: ProfileMeta,
	relationships?: ProfileRelationships,
	sms_timeout_until?: any,
	type?: string
}

type ProfileUser = {
	name?: string,
	surname?: string,
	patronymic?: string,
	noPatronymic?: boolean,
	phone?: string,
	phoneAdditional?: string,
	email?: string,
	emailAdditional?: string,
	gender?: { 
		id?: string, 
		name?: string 
	},
	birthday?: string,
	birthplace?: string,
	sameAsRegistration?: false,
	socials?: {
		vk?: string,
		fb?: string,
		tg?: string,
		ok?: string,
	},
	residence?: {
		country?: string,
		region?: string,
		locality?: string,
		street?: string,
		house?: string,
		building?: string,
		apartment?: string,
		without_room: false,
		postalCode?: string,
	},
	registration?: {
		country?: string,
		region?: string,
		locality?: string,
		street?: string,
		house?: string,
		building?: string,
		apartment?: string,
		without_room: false,
		postalCode?: string,
	},
}

type ProfileMeta = {
	created?: { [key: string]: any },
	updated?: { [key: string]: any }
}

type ProfileRelationships = {
	user?: {
		data?: {
			id?: string,
			type?:  string
		}
	}
}

type ProfileUserInfo = {
	email?: string,
	email_verified?: boolean,
	family_name?: string,
	given_name?: string,
	name?: string,
	preferred_username?: string,
	sub?: string,
}

type ProfileAttributes = {
	[key: string]:any,
	id: string,
	additional_email?: string,
	additional_phone?: string,
	birgth?: string,
	email?: string,
	sex?: 'M' | 'F',
	avatar?: {
		url: string
	},
	socials?: {
		vk?: string,
		fb?: string,
		tg?: string,
		ok?: string,
	},
	name?: {
		first?: string,
		full?: string,
		last?: string,
		middle?: string,
		without_middle?: boolean
	}
}