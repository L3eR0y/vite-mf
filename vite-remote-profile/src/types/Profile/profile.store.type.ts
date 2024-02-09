type ProfileStore = {
	profile?: Profile,
	educationLevel?: string,
	processState?: string,
	documentTypes?: { [key: string]: any }[],
	personalDocumentTypes?: { [key: string]: any }[],
	educationDocumentTypes?: { [key: string]: any }[],
	user?: ProfileUser,
	docs?: {
		documentType: any,
		noSnils: boolean,
	},

	documents?: { [key: string]: any }[],
}

export default ProfileStore